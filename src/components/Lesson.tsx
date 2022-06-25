import { isPast, format } from 'date-fns';
import { CheckCircle, Lock } from 'phosphor-react'
import ptBR from 'date-fns/locale/pt-BR'
import { Link, useParams } from 'react-router-dom';

interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: 'live' | 'class';
}


export function Lesson(props: LessonProps) {
  const { slug } = useParams<{ slug: string }>()

  const isLessonAvailable = isPast(props.availableAt);
  const availableDateFormatted = format(props.availableAt, "EEEE' - 'd' de 'MMMM' - 'k'h'mm", {
    locale: ptBR, 
  })

  const isActiveLesson = slug == props.slug;

  return (
    <Link to={`/event/lesson/${props.slug}`} className="text-gray-300">
      <span>
        {availableDateFormatted}
      </span>

      <div className={`rounded border border-gray-500 p-4 mt-2 ${isActiveLesson ? 'bg-gray-500 text-zinc-100' : '' } `}>
        <header className="flex items-center justify-between">
         {isLessonAvailable ? (
          <span className={`flex items-center gap-2 text-sm text-blue-500 font-medium ${isActiveLesson ? 'text-zinc-100' : '' }`}>
            <CheckCircle size={20} />
            Conteúdo liberado
          </span>
         ) : (
          <span className="flex items-center gap-2 text-sm text-orange-500 font-medium">
            <Lock size={20} />
            Em breve
          </span>
         )} 
          
          <span className="text-xs rounded py-[0.125rem] px-2 text-white border border-green-300 font-bold">
            {props.title == 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
          </span>
        </header>

        <strong className="text-gray-200 mt-5 block">
          {props.title}
        </strong>
      </div>
    </Link>
  );
}
