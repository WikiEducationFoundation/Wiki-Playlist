export default function childrenWithProps(children, extraProps = {}) {
  var childrenWithProps = React.Children.map(children, function(child){
    return React.cloneElement(child, extraProps);
  });
  console.log('children', childrenWithProps);
  return <div>{childrenWithProps}</div>
}