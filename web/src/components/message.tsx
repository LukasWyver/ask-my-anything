import { toast } from "sonner";
import { useState } from "react";
import { ThumbsUp } from "lucide-react";
import { useParams } from "react-router-dom";
import { createMessageReaction } from "../http/create-message-reaction";
import { removeMessageReaction } from "../http/remove-message-reaction";

interface MessageProps {
  id: string
  text: string
  answered?: boolean
  amountOfReactions: number
}

export function Message({ 
  text,
  id: messageId,
  answered = false,
  amountOfReactions,
}: MessageProps){
  const { roomId } = useParams();
  const [hasReacted, setHasReacted] = useState(false)

  if(!roomId) {
    throw new Error('Messages components must be used within room page')
  }

  async function createMessageReactionAction(){
    if(!roomId) {
      return
    }

    try {
      await createMessageReaction({ messageId, roomId })
    } catch {
      toast.error('Falha ao curtir mensagem, tente novamente!')
    }

    setHasReacted(true)
   }

  async function removeMessageReactionAction(){
    if(!roomId) {
      return
    }

    try {
      await removeMessageReaction({ messageId, roomId })
    } catch {
      toast.error('Falha ao descurtir mensagem, tente novamente!')
    }

    setHasReacted(false)
   }

  return (
    <li data-answered={answered} className="ml-6 leading-relaxed text-zinc-100 data-[answered=true]:opacity-50 data-[answered=true]:pointer-events-none">
      {text}
      
      {hasReacted ? (
        <button
          type="button"
          onClick={removeMessageReactionAction}
          className="mt-3 flex items-center gap-2 text-orange-400 text-sm font-medium hover:text-orange-500"
        >
          <ThumbsUp className="size-4" />
          Curtir pergunta ({amountOfReactions})
        </button>
      ) : (
        <button 
          type="button"
          onClick={createMessageReactionAction}
          className="mt-3 flex items-center gap-2 text-zinc-400 text-sm font-medium hover:text-zinc-300"
        >
          <ThumbsUp className="size-4" />
          Curtir pergunta ({amountOfReactions})
        </button>
      )}
    </li>
  )
}