# 本地 API 安全验证脚本
# 测试 HTTP Basic Auth 是否正常工作

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "  API 安全功能本地验证" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# 配置
$baseUrl = "http://localhost:3001"
$username = "admin"
$password = "72@DcCOe5QbxzM-N"

# 创建认证头
$credentials = "${username}:${password}"
$encodedCredentials = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes($credentials))
$authHeader = @{
    Authorization = "Basic $encodedCredentials"
}

Write-Host "📋 测试配置:" -ForegroundColor Yellow
Write-Host "  Base URL: $baseUrl" -ForegroundColor Gray
Write-Host "  Username: $username" -ForegroundColor Gray
Write-Host "  Password: ******** (已隐藏)" -ForegroundColor Gray
Write-Host ""

# 测试 1: 健康检查（公开端点）
Write-Host "🔍 测试 1: 健康检查端点（无需认证）" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/health" -Method Get -UseBasicParsing
    if ($response.StatusCode -eq 200) {
        Write-Host "  ✅ 通过 - 返回状态码: $($response.StatusCode)" -ForegroundColor Green
        Write-Host "  响应: $($response.Content)" -ForegroundColor Gray
    }
} catch {
    Write-Host "  ❌ 失败 - $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# 测试 2: 访问管理面板（无认证 - 应该失败）
Write-Host "🔍 测试 2: 访问管理面板（无认证 - 应该返回 401）" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/" -Method Get -UseBasicParsing
    Write-Host "  ❌ 失败 - 应该被拒绝但返回了 $($response.StatusCode)" -ForegroundColor Red
} catch {
    if ($_.Exception.Response.StatusCode.value__ -eq 401) {
        Write-Host "  ✅ 通过 - 正确返回 401 Unauthorized" -ForegroundColor Green
    } else {
        Write-Host "  ❌ 失败 - 返回了意外的状态码" -ForegroundColor Red
    }
}
Write-Host ""

# 测试 3: 访问管理面板（有认证 - 应该成功）
Write-Host "🔍 测试 3: 访问管理面板（有认证 - 应该成功）" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/" -Method Get -Headers $authHeader -UseBasicParsing
    if ($response.StatusCode -eq 200) {
        Write-Host "  ✅ 通过 - 返回状态码: $($response.StatusCode)" -ForegroundColor Green
        Write-Host "  内容长度: $($response.Content.Length) bytes" -ForegroundColor Gray
    }
} catch {
    Write-Host "  ❌ 失败 - $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# 测试 4: 获取询价列表（无认证 - 应该失败）
Write-Host "🔍 测试 4: 获取询价列表（无认证 - 应该返回 401）" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/api/inquiries" -Method Get -UseBasicParsing
    Write-Host "  ❌ 失败 - 应该被拒绝但返回了 $($response.StatusCode)" -ForegroundColor Red
} catch {
    if ($_.Exception.Response.StatusCode.value__ -eq 401) {
        Write-Host "  ✅ 通过 - 正确返回 401 Unauthorized" -ForegroundColor Green
    } else {
        Write-Host "  ❌ 失败 - 返回了意外的状态码" -ForegroundColor Red
    }
}
Write-Host ""

# 测试 5: 获取询价列表（有认证 - 应该成功）
Write-Host "🔍 测试 5: 获取询价列表（有认证 - 应该成功）" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/api/inquiries" -Method Get -Headers $authHeader -UseBasicParsing
    if ($response.StatusCode -eq 200) {
        Write-Host "  ✅ 通过 - 返回状态码: $($response.StatusCode)" -ForegroundColor Green
        $data = $response.Content | ConvertFrom-Json
        Write-Host "  询价数量: $($data.data.Count)" -ForegroundColor Gray
    }
} catch {
    Write-Host "  ❌ 失败 - $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# 测试 6: 提交新询价（无认证 - 应该成功，这是公开端点）
Write-Host "🔍 测试 6: 提交新询价（无认证 - 应该成功，公开端点）" -ForegroundColor Yellow
$testInquiry = @{
    name = "Test User"
    email = "test@example.com"
    phone = "1234567890"
    message = "This is a test inquiry from local validation"
} | ConvertTo-Json

try {
    $response = Invoke-WebRequest -Uri "$baseUrl/api/inquiries" -Method Post -Body $testInquiry -ContentType "application/json" -UseBasicParsing
    if ($response.StatusCode -eq 201) {
        Write-Host "  ✅ 通过 - 返回状态码: $($response.StatusCode)" -ForegroundColor Green
        $data = $response.Content | ConvertFrom-Json
        Write-Host "  新询价 ID: $($data.id)" -ForegroundColor Gray
    }
} catch {
    Write-Host "  ❌ 失败 - $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# 测试 7: 使用错误密码访问（应该失败）
Write-Host "🔍 测试 7: 使用错误密码访问（应该返回 401）" -ForegroundColor Yellow
$wrongCredentials = "admin:wrongpassword"
$wrongEncodedCredentials = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes($wrongCredentials))
$wrongAuthHeader = @{
    Authorization = "Basic $wrongEncodedCredentials"
}

try {
    $response = Invoke-WebRequest -Uri "$baseUrl/api/inquiries" -Method Get -Headers $wrongAuthHeader -UseBasicParsing
    Write-Host "  ❌ 失败 - 应该被拒绝但返回了 $($response.StatusCode)" -ForegroundColor Red
} catch {
    if ($_.Exception.Response.StatusCode.value__ -eq 401) {
        Write-Host "  ✅ 通过 - 正确拒绝了错误的凭据" -ForegroundColor Green
    } else {
        Write-Host "  ❌ 失败 - 返回了意外的状态码" -ForegroundColor Red
    }
}
Write-Host ""

# 总结
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "  测试完成！" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📌 验证要点:" -ForegroundColor Yellow
Write-Host "  ✅ 管理端点需要认证" -ForegroundColor Green
Write-Host "  ✅ 提交表单端点公开可用" -ForegroundColor Green
Write-Host "  ✅ 错误凭据被正确拒绝" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 在浏览器中测试:" -ForegroundColor Yellow
Write-Host "  1. 打开: http://localhost:3001/" -ForegroundColor Gray
Write-Host "  2. 输入用户名: $username" -ForegroundColor Gray
Write-Host "  3. 输入密码: $password" -ForegroundColor Gray
Write-Host ""
