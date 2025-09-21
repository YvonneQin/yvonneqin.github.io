#!/bin/bash

# 清理备份文件脚本
# 安全地删除所有 .backup 和 .backup2 文件

echo "🧹 正在清理备份文件..."

# 统计备份文件数量
BACKUP_COUNT=$(find . -name "*.backup*" -type f | wc -l)
echo "📊 发现 $BACKUP_COUNT 个备份文件"

if [ $BACKUP_COUNT -eq 0 ]; then
    echo "✅ 没有找到备份文件"
    exit 0
fi

echo ""
echo "📋 备份文件列表："
find . -name "*.backup*" -type f | head -10
if [ $BACKUP_COUNT -gt 10 ]; then
    echo "... 还有 $((BACKUP_COUNT - 10)) 个文件"
fi

echo ""
read -p "❓ 确定要删除所有备份文件吗？(y/N): " -n 1 -r
echo

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🗑️  正在删除备份文件..."
    
    # 删除所有备份文件
    find . -name "*.backup*" -type f -delete
    
    # 验证删除结果
    REMAINING=$(find . -name "*.backup*" -type f | wc -l)
    
    if [ $REMAINING -eq 0 ]; then
        echo "✅ 成功删除所有 $BACKUP_COUNT 个备份文件"
    else
        echo "⚠️  还有 $REMAINING 个备份文件未删除"
    fi
else
    echo "❌ 取消删除操作"
fi

echo ""
echo "💡 提示："
echo "   - 备份文件已安全删除"
echo "   - 如果需要恢复，可以使用 git 历史记录"
echo "   - 建议定期清理备份文件以保持项目整洁"
