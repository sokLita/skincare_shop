$filePath = "c:\Users\LITA.SOK\Desktop\skincare_shop\frontend\src\views\Home.vue"
$lines = Get-Content $filePath

# Sort skip ranges in descending order to remove from bottom up
$skipRanges = @(
    # Newsletter CSS styles: 0-based 1299-1321 (1-based 1300-1322)
    @{ Start = 1299; End = 1321 },
    # handleSubscribe method: 0-based 497-501 (1-based 498-502)
    @{ Start = 497; End = 501 },
    # email data property: 0-based 354 (1-based 355)
    @{ Start = 354; End = 354 }
)

# Sort by Start descending so we remove from bottom first (preserving indices)
$skipRanges = $skipRanges | Sort-Object Start -Descending

foreach ($range in $skipRanges) {
    $start = $range.Start
    $end = $range.End
    $lines = $lines[0..($start-1)] + $lines[($end+1)..($lines.Length-1)]
}

$lines | Set-Content $filePath -Encoding UTF8
Write-Output "Done. File now has $($lines.Length) lines."
