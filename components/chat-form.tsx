'use client'

import { cn } from '@/lib/utils'
import { useChat } from 'ai/react'
import { ArrowUpIcon, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { AutoResizeTextarea } from '@/components/autoresize-textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ThemeToggle } from '@/components/theme-toggle'

export function ChatForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const { messages, input, setInput, isLoading, append } = useChat({
    api: '/api/chat',
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.trim()) {
      void append({ content: input, role: 'user' })
      setInput('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)
    }
  }

  const header = (
    <header className="text-center space-y-2 mb-8 relative w-full">
      <div className="absolute right-0 top-0">
        <ThemeToggle />
      </div>
      <h1 className="text-2xl font-bold">AI 聊天机器人</h1>
      <p className="text-muted-foreground">
        由 Next.js、Vercel AI SDK 和 OpenAI 提供支持
      </p>
    </header>
  )

  const messageList = (
    <ScrollArea className="h-[calc(100vh-12rem)] pr-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={cn(
            "flex items-end mb-4",
            message.role === 'user' ? 'justify-end' : 'justify-start'
          )}
        >
          {message.role === 'assistant' && (
            <Avatar className="mr-2">
              <AvatarFallback>AI</AvatarFallback>
              <AvatarImage src="/ai-avatar.png" />
            </Avatar>
          )}
          <div
            className={cn(
              "max-w-[80%] rounded-lg px-4 py-2 text-sm",
              message.role === 'user'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted'
            )}
          >
            {message.content}
          </div>
          {message.role === 'user' && (
            <Avatar className="ml-2">
              <AvatarFallback>U</AvatarFallback>
              <AvatarImage src="/user-avatar.png" />
            </Avatar>
          )}
        </div>
      ))}
    </ScrollArea>
  )

  return (
    <div
      className={cn(
        'flex h-screen flex-col items-center justify-between p-8',
        className
      )}
      {...props}
    >
      {header}
      <div className="w-full max-w-2xl flex-1 overflow-hidden">
        {messages.length ? messageList : (
          <div className="flex h-full items-center justify-center text-center">
            <p className="text-muted-foreground">
              在下方输入消息开始对话。
            </p>
          </div>
        )}
      </div>
      <form
        onSubmit={handleSubmit}
        className="relative mt-4 w-full max-w-2xl"
      >
        <AutoResizeTextarea
          onKeyDown={handleKeyDown}
          onChange={(e) => setInput(e.target.value)}
          value={input}
          placeholder="在此输入您的消息..."
          className="w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-10"
          rows={1}
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="submit"
              size="icon"
              disabled={isLoading || input.trim().length === 0}
              className="absolute bottom-1 right-1 h-8 w-8"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ArrowUpIcon className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent sideOffset={10}>发送消息</TooltipContent>
        </Tooltip>
      </form>
    </div>
  )
}

