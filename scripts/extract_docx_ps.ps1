Add-Type -AssemblyName System.IO.Compression.FileSystem
$dir = Join-Path $PSScriptRoot '..\Dance\assets' | Resolve-Path
Get-ChildItem $dir -Filter *.docx | ForEach-Object {
    $zip = [System.IO.Compression.ZipFile]::OpenRead($_.FullName)
    $entry = $zip.GetEntry('word/document.xml')
    if ($entry) {
        $sr = New-Object System.IO.StreamReader($entry.Open(), [System.Text.Encoding]::UTF8)
        $xml = [xml]$sr.ReadToEnd()
        $ns = New-Object System.Xml.XmlNamespaceManager($xml.NameTable)
        $ns.AddNamespace('w','http://schemas.openxmlformats.org/wordprocessingml/2006/main')
        $nodes = $xml.SelectNodes('//w:t',$ns)
        $text = ($nodes | ForEach-Object { $_.InnerText }) -join "\n"
        $out = Join-Path $dir ($_.BaseName + '.txt')
        Set-Content -Path $out -Value $text -Encoding utf8
        Write-Host "Wrote: $out"
        $sr.Close()
    }
    $zip.Dispose()
}