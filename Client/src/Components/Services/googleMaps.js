import GoogleMapReact from 'google-map-react';

import React, {Component} from 'react';

class GMaps extends Component {

    constructor(props){
        super(props);
        this.state ={
            key: process.env.REACT_APP_GM_KEY,
            coordinates:this.props.Coordinates,
            zoom: 11,
            
        }
        this.handleSearch(props);
        
    }
    handleSearch(newSearch){
        if (newSearch===true){

           this.componentWillUnmount();
        }
    }
    componentWillUnmount() {
        console.log('Google maps will be unmount')
        clearInterval(this.interval);
    }


    
    render (){
        this.handleSearch(this.props.newSearch)
        return(
            <div style={{ height: '29vh', width: '100%' }}> 
                <GoogleMapReact
                bootstrapURLKeys={{ key: this.state.key}}
                defaultCenter= {this.props.Coordinates}
                defaultZoom= {this.state.zoom}
                
                >
              </GoogleMapReact>
            </div>



        )


    }
}

export default GMaps;