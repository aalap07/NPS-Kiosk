import React, { useEffect, useState } from 'react';
import style from './park.module.css';
import Panel from '../panel/ExpansionPanel';
import GoogleMapsContainer from '../map/GoogleMapsContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

const API_KEY = 'dv4BgBalhdqz2FtOpA6zhe4BYSehZihKgvMP9RPj';

const Park = ({ title, parkCode, desc, states, latLong, images}) => {

    const [visitors, setVisitors] = useState([]);
    const [fees, setFees] = useState([]);
    const [grounds, setGrounds] = useState([]);
    const [alerts, setAlerts] = useState([]);
    const [articles, setArticles] = useState([]);
    const [events, setEvents] = useState([]);
    const [news, setNews] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [places, setPlaces] = useState([]);
    const [people, setPeople] = useState([]);
    const [image, setImage] = useState(images.length > 0 ? images[0].url : "https://www.nps.gov/common/commonspot/templates/images/logos/nps_social_image_02.jpg");

    const getArticleData = async () => {
        const response = await fetch(`https://developer.nps.gov/api/v1/articles?parkCode=${parkCode}&limit=5&api_key=${API_KEY}`);
        const data = await response.json();
        setArticles(data.data);
    }

    const getVisitorData = async () => {
        const response = await fetch(`https://developer.nps.gov/api/v1/visitorcenters?parkCode=${parkCode}&limit=10&api_key=${API_KEY}`);
        const data = await response.json();
        setVisitors(data.data);
    }

    const getAlertData = async () => {
        const response = await fetch(`https://developer.nps.gov/api/v1/alerts?parkCode=${parkCode}&limit=10&api_key=${API_KEY}`);
        const data = await response.json();
        setAlerts(data.data);
    }

    const getGroundsData = async () => {
        const response = await fetch(`https://developer.nps.gov/api/v1/campgrounds?parkCode=${parkCode}&limit=10&api_key=${API_KEY}`);
        const data = await response.json();
        setGrounds(data.data);
    }

    const getEventsData = async () => {
        const response = await fetch(`https://developer.nps.gov/api/v1/events?parkCode=${parkCode}&limit=2&api_key=${API_KEY}`);
        const data = await response.json();
        setEvents(data.data);
    }

    const getNewsData = async () => {
        const response = await fetch(`https://developer.nps.gov/api/v1/news?parkCode=${parkCode}&limit=5&api_key=${API_KEY}`);
        const data = await response.json();
        setNews(data.data);
    }

    const getLessonsData = async () => {
        const response = await fetch(`https://developer.nps.gov/api/v1/lessonplans?parkCode=${parkCode}&limit=5&api_key=${API_KEY}`);
        const data = await response.json();
        setLessons(data.data);
    }

    const getPlacesData = async () => {
        const response = await fetch(`https://developer.nps.gov/api/v1/places?parkCode=${parkCode}&limit=5&api_key=${API_KEY}`);
        const data = await response.json();
        setPlaces(data.data);
    }

    const getPeopleData = async () => {
        const response = await fetch(`https://developer.nps.gov/api/v1/people?parkCode=${parkCode}&limit=5&api_key=${API_KEY}`);
        const data = await response.json();
        setPeople(data.data);
    }

    const getFeesData = async () => {
        const response = await fetch(`https://developer.nps.gov/api/v1/parks?parkCode=${parkCode}&limit=5&start=0&fields=entranceFees&api_key=${API_KEY}`);
        const data = await response.json();
        setFees(data.data[0].entranceFees);
    }



    useEffect(() => {
        getVisitorData();
        getGroundsData();
        getAlertData();
        getArticleData();
        getEventsData();
        getNewsData();
        getLessonsData();
        getPlacesData();
        getPeopleData();
        getFeesData();
    }, [])

    function getIndex(initial){
        for(var i = 0; i < initial.length; i++) {
            if (initial.charAt(i) === ":"){
                return i;
            }
        }
        return -1;
    }
    var latIndex = getIndex(latLong);
    var longIndex = getIndex(latLong.substring(latIndex+1)) + latIndex+1;
    const lat = latLong.substring(latIndex+1, latIndex+10);
    const long = latLong.substring(longIndex+1, longIndex+10);
    
    var latVal = parseFloat(lat, 10);
    var longVal = parseFloat(long, 10);
    return (
        <div className={style.park}>
            <br />

            <h2 className={style.head}>{title}</h2>
            <div className={style.mapIcon}>
                <FontAwesomeIcon
                    color="white"
                    icon={faMapMarkerAlt}
                    size="3x"

                />
                <div className={style.locLabel}>
                    
                    <p>{states}</p>
                </div>
            </div>
        {latLong !== "" ?  <GoogleMapsContainer
                lat={latVal}
                long={longVal}
                
            /> : <p align="right"  style={{ color: 'white' }}> Location coordinates not provided by API. </p> }
           
            <img className={style.parkImage} src={image} alt="Image" />
            <br /> <br />
            
            <p></p>
            <Panel
                desc={desc}
                parkCode={parkCode}
                visitors={visitors}
                grounds={grounds}
                alerts={alerts}
                articles={articles}
                events={events}
                news={news}
                lessons={lessons}
                places={places}
                people={people}
                fees={fees}

            />


        </div>
    );
}

function handleClick(e, parkCode, dir) {
    e.preventDefault();
    var win = window.open(`${dir}`, '_blank');
    win.focus();

}

export default Park;
