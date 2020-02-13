import GoogleMapReact from 'google-map-react';

import React, {Component} from 'react';

class GMaps extends Component {

    constructor(props){
        super(props);
        this.state ={
            key: 'AIzaSyDM1anm6wLXg3LsLg33sN2-RaK4soOJYRE',
            coordinates:this.props.Coordinates,
            zoom: 15
        }
        
    }



    
    render (){
        console.log(this.props.Coordinates)
        return(
            <div style={{ height: '29vh', width: '100%' }}> 
                <GoogleMapReact
                bootstrapURLKeys={{ key: this.state.key}}
                defaultCenter= {this.props.Coordinates}
                defaultZoom= {this.state.zoom}
                ></GoogleMapReact>
            </div>



        )


    }
}

export default GMaps;