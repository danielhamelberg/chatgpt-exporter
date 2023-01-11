import { getConversation } from '../parser'
import type { Conversation } from '../type'
import { downloadFile } from '../utils/download'
import { timestamp } from '../utils/utils'
import { lineToText } from './text'

export function exportToMarkdown() {
    const conversations = getConversation()
    if (conversations.length === 0) return alert('No conversation found. Please send a message first.')

    const text = conversationToMarkdown(conversations)
    downloadFile(`chatgpt-${timestamp()}.md`, 'text/markdown', text)
}

function conversationToMarkdown(conversation: Conversation[]) {
    return conversation.map((item) => {
        const { author: { name }, lines } = item
        const text = lines.map(line => lineToText(line)).join('\r\n\r\n')
        return `#### ${name}:\r\n${text}`
    }).join('\r\n\r\n')
}
