import { ChatForm } from '@/components/chat-form'

export default function Page() {
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <ChatForm className="flex-1" />
    </div>
  )
}

