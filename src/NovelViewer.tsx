import './App.css'
import { Boustrophedon } from './Boustrophedon';
import { Novel } from './assets/novel.type';

type Props = {
  novel: Novel;
  reverse?: boolean;
  id: string;
}

const NovelViewer = (props: Props) => {
  return (
    <div>
      <h2 style={{
        textAlign: 'center',
        textDecoration: 'underline',
      }}>{props.novel.title}</h2>
      <div className='wrapper'>
        <Boustrophedon body={props.novel.body} id={props.id} reverse={props.reverse} />
      </div>
    </div>
  )
}

export default NovelViewer;
