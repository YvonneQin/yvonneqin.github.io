#!/bin/bash

# 修复所有使用site-header组件的页面的iconfont问题
# 这些页面需要添加iconfont CSS文件才能显示导航中的图标

echo "🔧 正在修复所有使用site-header组件的页面的iconfont问题..."

# 需要修复的页面列表（排除已经修复的）
PAGES=(
    "project_AI.html"
    "project_MM.html" 
    "project_DCT.html"
    "project_Construct.html"
    "project_POC.html"
    "project_Law.html"
    "project_Askbob.html"
    "project_Gradute.html"
    "project_COE.html"
    "project1.html"
    "404.html"
)

ICONFONT_URL="https://at.alicdn.com/t/c/font_4545731_1iwxww92za1.css"
PRECONNECT_URL="https://at.alicdn.com"

for page in "${PAGES[@]}"; do
    if [ -f "$page" ]; then
        echo "📝 正在修复: $page"
        
        # 备份原文件
        cp "$page" "$page.backup"
        
        # 检查是否已经有iconfont链接
        if ! grep -q "at\.alicdn\.com.*font" "$page"; then
            # 添加预连接（如果还没有）
            if ! grep -q "preconnect.*at\.alicdn\.com" "$page"; then
                sed -i '' '/<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com"/a\
    <link rel="preconnect" href="https://at.alicdn.com" crossorigin />' "$page"
            fi
            
            # 添加iconfont CSS文件
            sed -i '' '/<link rel="stylesheet" href="css\/custom\.css" \/>/a\
    <link rel="stylesheet" href="'$ICONFONT_URL'" />' "$page"
            
            echo "✅ 已修复: $page"
        else
            echo "⚠️  已包含iconfont: $page"
        fi
    else
        echo "❌ 文件不存在: $page"
    fi
done

echo ""
echo "🎉 修复完成！"
echo "💾 备份文件已保存为 .backup 扩展名"
echo "🔗 使用的iconfont链接: $ICONFONT_URL"
