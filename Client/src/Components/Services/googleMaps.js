import GoogleMapReact from 'google-map-react';

import React, {Component} from 'react';

class GMaps extends Component {

    constructor(props){
        super(props);
        this.state ={
            key: "",
            coordinates:this.props.Coordinates,
            zoom: 11
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