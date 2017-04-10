import { CacheService } from 'ionic-cache/ionic-cache';
import { Injectable } from '@angular/core';
import { Http, Jsonp, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MeetupData {

  private baseUrlV1 = "https://api.meetup.com/";
  private baseUrlV2 = "https://api.meetup.com/2/";
  private apiKey    = "756f3d3c2c633b7fb272d1b2f367c70";

  CATEGORIES = {
    ART_AND_CULTURE      : 1,
    BUSINESS             : 2,
    VEHICLES             : 3,
    COMMUNITY            : 4,
    DANCE                : 5,
    EDUCATION            : 6,
    FASHION              : 8,
    FITNESS              : 9,
    FOOD_AND_DRINK       : 10,
    GAMES                : 11,
    LGBT                 : 12,
    POLITICS             : 13,
    HEALTH               : 14,
    ARTCRAFT             : 15,
    FOREIGN_LANGUAGE     : 16,
    LIFESTYLE            : 17,
    READING_CLUB         : 18,
    CINEMA               : 20,
    MUSIC                : 21,
    SPIRITUALITY         : 22,
    OUTDOORS             : 23,
    PARANORMAL           : 24,
    MOMS_AND_DADS        : 25,
    PETS                 : 26,
    PHOTOGRAPHY          : 27,
    RELIGION             : 28,
    SCI_FI_AND_FANTASY   : 30,
    SINGLES              : 30,
    SOCIALIZING          : 31,
    SPORTS               : 32,
    SUPPORT              : 33,
    TECH                 : 34,
    WRITING              : 36,
  }

  constructor(public http: Http, public jsonp: Jsonp, public cache: CacheService) { }

  get(endpoint: string, params?: any, cacheKey?: string, jsonp: boolean = true, options?: RequestOptions) {

    options = new RequestOptions();

    // Support easy query params for GET requests
    let p = new URLSearchParams();
    if (params) {
      for(let k in params) {
        p.set(k, params[k]);
      }

    }

    if(jsonp){
      // For jsonp calls so we don't have cors issues
      p.set('callback', 'JSONP_CALLBACK');
    }

    // Needed params to make the request
    p.set('key' , this.apiKey);

    // Set the search field if we have params and don't already have
    // a search field set in options.
    options.search = !options.search && p || options.search;
    let request = jsonp ? this.jsonp.request(endpoint, options).map(res => res.json())
                 : this.http.get("https://crossorigin.me/" + endpoint, options).map(res => res.json());
    return this.cache.loadFromObservable(cacheKey, request);
  }

  getMeetups(topics, lat?, long?): any {
    let params = {
      // city     : city,
      text     : topics || '',
      time     : ',1w',
      category : this.CATEGORIES.TECH,
    }

    if(lat && long){
      params['lat'] = lat;
      params['lon'] = long;
    }

    let endpoint = 'open_events';
    let cacheKey = endpoint + JSON.stringify(params);
    return this.get(this.baseUrlV2 + endpoint, params, cacheKey);
  }

  getMeetupGroups(topics, lat?, long?): any {
    // let params = {
    //   text     : topic,
    //   order    : 'newest',
    //   radius   : 'global',
    //   category : this.CATEGORIES.TECH,
    // }
    let params = {
      // city     : city,
      text     : topics || '',
      category : this.CATEGORIES.TECH,
    }

    if(lat && long){
      params['lat'] = lat;
      params['lon'] = long;
    }

    let endpoint = "find/groups"
    let cacheKey = endpoint + JSON.stringify(params);
    return this.get(this.baseUrlV1 + endpoint, params, cacheKey);
  }

  getMeetupDetail(meetupUrl, eventId): any {
    let endpoint = `${meetupUrl}/events/${eventId}`;
    return this.get(this.baseUrlV1 + endpoint, null, endpoint);
  }

  getMeetupHosts(meetupUrl, eventId): any{
    let endpoint = `${meetupUrl}/events/${eventId}/hosts`;
    return this.get(this.baseUrlV1 + endpoint, null, endpoint, false);
  }

  getMeetupComments(meetupUrl, eventId): any {
    let endpoint = `${meetupUrl}/events/${eventId}/comments`;
    return this.get(this.baseUrlV1 + endpoint, null, endpoint, false);
  }

  getMeetupGroupInfo(meetupUrl) {
    return this.get(this.baseUrlV1 + meetupUrl, null, meetupUrl);
  }

  getMemberDetails(memberId){
    let endpoint = `member/${memberId}`;
    return this.get(this.baseUrlV2 + endpoint, null, endpoint, false);
  }

}
