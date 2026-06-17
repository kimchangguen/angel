$r = Invoke-WebRequest -Uri 'http://localhost:3099/' -UseBasicParsing
$content = $r.Content
$headEnd = $content.IndexOf('</head>')
if ($headEnd -gt 0) {
    $head = $content.Substring(0, $headEnd)
    Write-Output $head
}
