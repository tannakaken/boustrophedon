import './App.css'
import { Boustrophedon } from './Boustrophedon';
import { Novel } from './assets/novel.type';

type Props = {
  novel: Novel;
  id: string;
}

const NovelViewer = (props: Props) => {
  return (
    <div>
      <h2>{props.novel.title}</h2>
      <div className='wrapper'>
        <Boustrophedon body={props.novel.body} id={props.id} />
      </div>
    </div>
  )
}

export default NovelViewer;
