param(
    [string]$pptxPath,
    [string]$pdfPath
)

$resolvedPptx = (Resolve-Path $pptxPath).Path
if (-not $pdfPath) {
    $pdfPath = [System.IO.Path]::ChangeExtension($resolvedPptx, ".pdf")
}

$ppt = New-Object -ComObject PowerPoint.Application
try {
    # Open presentation (FileName, ReadOnly, Untitled, WithWindow)
    $pres = $ppt.Presentations.Open($resolvedPptx, [Microsoft.Office.Core.MsoTriState]::msoTrue, [Microsoft.Office.Core.MsoTriState]::msoFalse, [Microsoft.Office.Core.MsoTriState]::msoFalse)
    # 32 = ppSaveAsPDF
    $pres.SaveAs($pdfPath, 32)
    $pres.Close()
    Write-Output "SUCCESS: PDF created at $pdfPath"
}
catch {
    Write-Error $_.Exception.Message
}
finally {
    $ppt.Quit()
    [System.Runtime.Interopservices.Marshal]::ReleaseComObject($ppt) | Out-Null
    [System.GC]::Collect()
    [System.GC]::WaitForPendingFinalizers()
}
