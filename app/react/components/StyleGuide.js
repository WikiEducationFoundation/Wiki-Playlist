export default class StyleGuide extends React.Component {
  render() {
    return (
      <div className='p2 clearfix'>
        <h1 className='mb1'>My Favorite Wikipedia Articles</h1>
        <p className='caption mb2'>Add Playlist Caption</p>
        <div className='py2 border-top border-bottom col-6'>
          <h2 className='mb1'>Article Title</h2>
          <p className='summary'>
            Article Description - Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It is a gas giant with an average radius about nine times that of Earth…
          </p>
          <button className='action mt2'>Share</button>
        </div>
        <div className='py2 border-bottom col-6'>
          <div className='mb2'><a href='#' className='action action--external-serif'>View Article <span></span></a></div>
          <div className='mb2'><a href='#' className='action action--external-sans'>View on Wikipedia <span></span></a></div>
          <div className='mb2'><a href='#' className='action action--default'>Add<span></span></a></div>
          <div className='mb2'><a href='#' className='btn btn-primary'>Add Article<span></span></a></div>
          <div className='mb2'><a href='#' className='btn btn-outline'>Preview<span></span></a></div>
          <div className='mb2'><a href='#' className='btn btn-outline--alt'>Change Article<span></span></a></div>
          <div className='mb2'><a href='#' className='btn btn--search-result'>Add Article<span></span></a></div>
        </div>
        <div className='py2 border-bottom col-6'>
          <div className='editable-container' style={{
            width: 150,
            height: 150
          }}></div>
        </div>
      </div>
    )
    
  }
        
}