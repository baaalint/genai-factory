import Bubble from '@components/shared/Bubble'
import Button from '@components/shared/Button'
import Message from '@components/shared/Message'
import Search from '@components/shared/Search'
import Client from '@services/Api'
import { ChatHistory } from '@shared/types'
import { adminAtom, sessionIdAtom, usernameAtom } from 'atoms'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import './Chat.css'

const Chat = () => {
  const [messages, setMessages] = useState<ChatHistory[]>([])
  const [sessionId, setSessionId] = useAtom(sessionIdAtom)
  const [username, setUsername] = useAtom(usernameAtom)
  const [admin, setAdmin] = useAtom(adminAtom)

  useEffect(() => {
    async function fetchData() {
      console.log('getting session:', sessionId)
      if (!sessionId) {
        setMessages([])
        return
      }
      const chatSession = await Client.getSession(sessionId)
      console.log('session resp:', chatSession)
      if (chatSession) {
        setMessages(chatSession.history)
      } else {
        setMessages([])
      }
    }
    fetchData()
  }, [sessionId])

  return (
    <div className="comp-chat">
      <details className="mobile-menu">
        <summary>
          <div className="icon-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </div>
        </summary>
        <div className="inner-menu">
          <Search />
          <Button label="History" onClick={e => console.log(e)} />
          <Button label="Properties" onClick={e => console.log(e)} />
          <Button label="New Chat" onClick={e => console.log(e)} />
        </div>
      </details>

      <div className="chat-flex">
        <div className="bubbles-flex">
          {messages.map((chatHistory, key) => (
            <Bubble
              key={key}
              content={chatHistory.content}
              bot={chatHistory.role}
              sources={chatHistory.sources}
              html={chatHistory.html as string}
            />
          ))}
        </div>

        <Message setter={setMessages} />
      </div>
    </div>
  )
}

export default Chat
