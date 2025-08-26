#!/bin/bash

# 批量更新项目详情页为数据驱动方式
echo "开始批量更新项目详情页..."

# 函数：更新单个文件
update_project_file() {
    local file="$1"
    local project_key="$2"
    echo "处理: $file (项目: $project_key)"
    
    # 添加项目数据模块导入
    sed -i '' '/<script src="js\/components\/password-protection.js"><\/script>/a\
  <script src="js/project-data.js"></script>' "$file"
    
    # 查找并替换项目信息部分（需要根据具体文件结构调整）
    # 这里先标记，后续手动处理
    echo "  - 已添加项目数据模块导入"
    echo "  - 需要手动更新项目信息部分为: <div data-project=\"$project_key\" data-type=\"full\"></div>"
}

# 更新主要项目文件
update_project_file "project_DCT.html" "dct"
update_project_file "project_MM.html" "mm"
update_project_file "project_Law.html" "law"
update_project_file "project_Askbob.html" "askbob"
update_project_file "project_POC.html" "poc"
update_project_file "project_Gradute.html" "graduate"
update_project_file "project_COE.html" "coe"

echo "批量更新完成！"
echo "注意：项目信息部分需要手动替换为数据驱动方式"
