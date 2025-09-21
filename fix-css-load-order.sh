#!/bin/bash

# 修复所有页面的CSS加载顺序，确保iconfont在rad-icons之前加载

echo "🔧 正在修复CSS加载顺序..."

# 需要修复的页面列表
PAGES=(
    "my_insight.html"
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

for page in "${PAGES[@]}"; do
    if [ -f "$page" ]; then
        echo "📝 正在修复: $page"
        
        # 备份原文件
        cp "$page" "$page.backup2"
        
        # 检查是否包含iconfont链接
        if grep -q "at\.alicdn\.com.*font" "$page"; then
            # 重新排列CSS加载顺序：main.css -> iconfont -> rad-icons -> custom.css
            sed -i '' '/<link rel="stylesheet" href="css\/main\.css" \/>/a\
    <link rel="stylesheet" href="https://at.alicdn.com/t/c/font_4545731_1iwxww92za1.css" />' "$page"
            
            # 删除原来的iconfont链接
            sed -i '' '/<link rel="stylesheet" href="https:\/\/at\.alicdn\.com\/t\/c\/font_4545731_1iwxww92za1\.css" \/>/d' "$page"
            
            echo "✅ 已修复: $page"
        else
            echo "⚠️  没有iconfont链接: $page"
        fi
    else
        echo "❌ 文件不存在: $page"
    fi
done

echo ""
echo "🎉 CSS加载顺序修复完成！"
echo "💾 备份文件已保存为 .backup2 扩展名"
