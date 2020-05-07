import GoogleMapReact from 'google-map-react';
import React, {Component} from 'react';
import { Icon } from 'semantic-ui-react';


const pinStyle={
    borderRadius: '10px',
    transform: 'matrix(-1, 0, 0, 1, 10, 0)'
  }
  const FacilityPin = (props) => {
      return(
        <div>
          <Icon className="building icon" 
            size='big' 
            style={pinStyle} 
            onClick={props.onClick}
           />
        </div>
      )
  }
const iconStyle = {  
    borderRadius: '100px',  
    boxShadow: '3px 3px 1px #888888'
} 
const CurrentPin = ({text}) => {  
   return(
      <div>
        <Icon name="user circle outline" 
         color='blue' 
         size='big' 
         style={iconStyle}
        />      
        {text} 
       </div> 
    )
}

class GMaps extends Component {

    constructor(props){
        super(props);
        this.state ={
            key: process.env.REACT_APP_GM_KEY,
            center: this.props.Coordinates,
            lat: this.props.Coordinates.lat,
            lng: this.props.Coordinates.lng,
            zoom: 15,
            
        }
       
    }
        // this.handleSearch(props);
        
   // }
    // handleSearch(newSearch){
    //     if (newSearch===true){

    //        this.componentWillUnmount();
    //     }
   // }
    // componentWillUnmount() {
    //     console.log('Google maps will be unmount')
    //     clearInterval(this.interval);
    // }
    

    
    render (){
        
        console.log(this.state.lat, this.state.lng)
        return(
            <div style={{ height: '29vh', width: '100%' }}> 
                <GoogleMapReact
                bootstrapURLKeys={{ key: this.state.key}}
                defaultCenter= {this.state.center}
                defaultZoom= {this.state.zoom}
                yesIWantToUseGoogleMapApiInternals
                
                >{FacilityPin}<CurrentPin lat={this.state.lat} lng={this.state.lng} />
              </GoogleMapReact>
            </div>



        )


    }
}

export default GMaps;