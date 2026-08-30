$ErrorActionPreference = 'Stop'
$projectRoot = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '..')).Path
$outputDir = Join-Path $projectRoot 'dist\server'
$outputFile = Join-Path $outputDir 'index.js'

$assets = [ordered]@{
  '/index.html' = @{ file = 'index.html'; type = 'text/html; charset=utf-8' }
  '/css/style.css' = @{ file = 'css\style.css'; type = 'text/css; charset=utf-8' }
  '/data/data.js' = @{ file = 'data\data.js'; type = 'text/javascript; charset=utf-8' }
  '/data/papers.js' = @{ file = 'data\papers.js'; type = 'text/javascript; charset=utf-8' }
  '/js/app.js' = @{ file = 'js\app.js'; type = 'text/javascript; charset=utf-8' }
}

New-Item -ItemType Directory -Force -Path $outputDir | Out-Null
$entries = foreach($route in $assets.Keys){
  $asset = $assets[$route]
  $assetPath = Join-Path $projectRoot $asset.file
  if(-not (Test-Path -LiteralPath $assetPath)){
    throw "Missing site asset: $assetPath"
  }
  $encoded = [Convert]::ToBase64String([IO.File]::ReadAllBytes($assetPath))
  "  $($route | ConvertTo-Json): { type: $($asset.type | ConvertTo-Json), body: $($encoded | ConvertTo-Json) }"
}

$worker = @"
const FILES = {
$($entries -join ",`n")
};

function decodeBase64(value) {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return bytes;
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname === '/' ? '/index.html' : url.pathname.replace(/\/$/, '/index.html');
    const file = FILES[path];
    if (!file) return new Response('Not found', { status: 404 });

    const cacheControl = path === '/index.html' ? 'no-cache' : 'public, max-age=3600';
    return new Response(decodeBase64(file.body), {
      headers: {
        'content-type': file.type,
        'cache-control': cacheControl,
        'x-content-type-options': 'nosniff'
      }
    });
  }
};
"@

[IO.File]::WriteAllText($outputFile, $worker, [Text.UTF8Encoding]::new($false))
Write-Output "Built hosted worker at $outputFile"
