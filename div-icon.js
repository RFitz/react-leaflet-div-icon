import { PropTypes, Children } from 'react';
import { render } from 'react-dom';
import { DivIcon, marker } from 'leaflet';
import { MapLayer } from 'react-leaflet';

export default class Divicon extends MapLayer {
  static propTypes = {
    opacity: PropTypes.number,
    zIndexOffset: PropTypes.number,
  };

  componentWillMount() {
    super.componentWillMount();
    const { map: _map, layerContainer: _lc, position, ...props } = this.props;
    this.icon = new DivIcon(props);
    this.leafletElement = marker(position, { icon: this.icon,  ...props });
  }
  componentDidMount() {
    super.componentDidMount();
    this.renderContent();
  }

  componentDidUpdate(prevProps) {
    this.renderContent();
    if (this.props.position !== prevProps.position) {
      this.leafletElement.setLatLng(this.props.position);
    }
    if (this.props.zIndexOffset !== prevProps.zIndexOffset) {
      this.leafletElement.setZIndexOffset(this.props.zIndexOffset);
    }
    if (this.props.opacity !== prevProps.opacity) {
      this.leafletElement.setOpacity(this.props.opacity);
    }
    if (this.props.draggable !== prevProps.draggable) {
      if (this.props.draggable) {
        this.leafletElement.dragging.enable();
      }
      else {
        this.leafletElement.dragging.disable();
      }
    }
  }

  renderContent() {
    const container = this.leafletElement._icon;
    if(container){
      render(
        Children.only(this.props.children),
        container
      );
    }
    
  }

  render() {
    return null;
  }
}
