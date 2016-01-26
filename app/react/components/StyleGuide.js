import { ArticleCard } from './ArticleCard';
import Icon from './Icon';
import { Link } from 'react-router';
import UserControls from './UserControls';

export default class StyleGuide extends React.Component {
  render() {
    return (
      <div>
      <nav className="site__navigation">
          <div className='container flex flex-center flex-justify'>
            <Link to="/" className='black'>
              <img src='//upload.wikimedia.org/wikipedia/en/8/80/Wikipedia-logo-v2.svg' height='30'/>
              <span className='px2'>Wikipedia Collections</span>
            </Link>
            <UserControls/>
          </div>
      </nav>

      <div className='py2 px1 clearfix container'>

        <h1 className='mb1'>My Favorite Wikipedia Articles</h1>
        <p className='caption mb2'>Add Playlist Caption</p>
        <h3 className='h3 mb2'>Wikipedia Collection Creator</h3>
        <div className='py2 border-top border-bottom md-col-6'>
          <h2 className='mb1'>Article Title</h2>
          <p className='summary'>
            Article Description - Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It is a gas giant with an average radius about nine times that of Earth…
          </p>
          <button className='action mt2'>Share</button>
        </div>
        <div className='py2 border-bottom md-col-6'>
          <div className='mb2'><a href='#' className='action action--external-serif'>View Article <Icon size="14px" icon="external-link" fill={'teal'} /></a></div>
          <div className='mb2'><a href='#' className='action action--external-sans'>View on Wikipedia <span></span></a></div>
          <div className='mb2'><a href='#' className='action action--default'>Add<span></span></a></div>
          <div className='mb2'><a href='#' className='btn btn-primary'>Add Article<span></span></a></div>
          <div className='mb2'><a href='#' className='btn btn-outline'>Preview<span></span></a></div>
          <div className='mb2'><a href='#' className='btn btn-outline--alt'>Change Article<span></span></a></div>
          <div className='mb2'><a href='#' className='btn btn--search-result'>Add Article<span></span></a></div>
          <div className='mb2 gray'>Edit Icon <Icon size="20px" icon="edit" fill={'silver'} /></div>
        </div>
        <div className='py2 border-bottom'>
          <div className='editable-container mb2 flex flex-column flex-justify-center flex-center' style={{
            width: 300,
            height: 250
          }}>
            <div><a href='#' className='btn btn-primary'>Add Article<span></span></a></div>
          </div>
          <ArticleCard {...{
            has_article: true,
            editing_options: false,
            title: 'Zebra',
            index: 0,
            Onboarding: {
              onboarded: true
            },
            description: 'Lorem ipsum Esse officia enim nostrud fugiat deserunt eiusmod nulla aliquip sed quis qui eu sunt occaecat mollit mollit minim in tempor et nulla dolor sunt tempor nulla ullamco ullamco cillum nostrud quis aute voluptate tempor sit aliqua in in Duis cupidatat incididunt consectetur cupidatat culpa cillum est nisi dolor ex Excepteur enim exercitation tempor laborum laboris veniam est incididunt deserunt in Duis reprehenderit ad esse consectetur nisi ea culpa sit ut nulla tempor dolore voluptate non sint id eu nostrud irure nostrud sunt dolore do pariatur cupidatat reprehenderit commodo anim labore pariatur dolore ut dolor esse pariatur anim magna dolor occaecat aliquip magna dolore in velit cupidatat et occaecat mollit cupidatat esse amet irure et reprehenderit dolor exercitation quis dolor dolore anim labore enim in anim ex eiusmod in incididunt voluptate aliquip aliquip in fugiat proident consectetur commodo consequat Duis enim aliqua pariatur sint cupidatat velit nulla culpa mollit ad do consectetur id labore consequat sit incididunt est exercitation est mollit anim Excepteur adipisicing est magna ullamco elit deserunt laborum et non occaecat Duis in sit incididunt amet amet est officia veniam fugiat eiusmod Duis eu dolore deserunt consequat commodo ea Ut cupidatat in laborum sunt ut Duis et in ut mollit qui consectetur dolore dolore eu dolor commodo fugiat in adipisicing do exercitation amet in proident minim Excepteur in id irure deserunt occaecat aliqua officia occaecat dolor pariatur labore nulla aliqua laborum mollit officia magna elit sed do mollit in exercitation veniam ea.',
            image: {url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Plains_Zebra_Equus_quagga.jpg/600px-Plains_Zebra_Equus_quagga.jpg'},
            images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Zebrafisch.jpg/600px-Zebrafisch.jpg'],
            Playlist: {animating: false}
          }}/>
        </div>
      </div>
      </div>
    )
    
  }
        
}