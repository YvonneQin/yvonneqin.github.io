import os  # 添加这一行以导入 os 模块
import openai  # 使用 OpenAI Python 客户端
from flask import Flask, request, jsonify, render_template

print(f"Current working directory: {os.getcwd()}")

app = Flask(__name__)

# 从环境变量中隐式获取 Azure OpenAI API 的配置信息
openai.api_key = os.getenv("AZURE_OPENAI_API_KEY")  # 从环境变量获取 API Key
openai.api_base = os.getenv("AZURE_OPENAI_API_BASE")  # 从环境变量获取 API 终结点
openai.api_type = "azure"  # 明确指定使用 Azure OpenAI
openai.api_version = os.getenv("AZURE_OPENAI_API_VERSION")  # 从环境变量获取 API 版本


@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.json  # 获取请求的 JSON 数据
        user_input = data.get("question", "")  # 获取用户输入的问题
        if not user_input:
            return jsonify({"error": "No question provided"}), 400  # 检查是否有问题输入

        # 使用 Azure OpenAI Chat API 生成响应
        response = openai.ChatCompletion.create(
            engine="gpt-35-turbo",  # 使用 Azure OpenAI 模型引擎名称
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": user_input}
            ]
        )

        # 提取并返回模型响应
        reply = response['choices'][0]['message']['content']
        return jsonify({"response": reply})

    except Exception as e:
        print(f"Error occurred: {e}")  # 打印错误到终端
        return jsonify({"error": "An internal error occurred"}), 500  # 返回 500 错误，带有错误消息

@app.route('/favicon.ico')
def favicon():
    return '', 204  # 返回空响应，或者实际的 favicon 文件

@app.route('/')
def index():
    return render_template('bot.html')  # 渲染你创建的HTML页面

# 启动 Flask 服务器，放在文件最后
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5002, debug=True)
