import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MeetupData {

  private baseUrl = "https://api.meetup.com/2/";
  private apiKey  = "756f3d3c2c633b7fb272d1b2f367c70";

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

  constructor(public http: Http) { }

  get(endpoint: string, params?: any, options?: RequestOptions) {
    if (!options) {
      options = new RequestOptions();
    }

    // Support easy query params for GET requests
    if (params) {
      let p = new URLSearchParams();
      for(let k in params) {
        p.set(k, params[k]);
      }

      // Needed params to make the request
      p.set('key'   , this.apiKey);
      p.set('format', 'json');

      // Set the search field if we have params and don't already have
      // a search field set in options.
      options.search = !options.search && p || options.search;
    }

    let url = "https://crossorigin.me/" + this.baseUrl + endpoint;
    return this.http.get(url, options);
  }

  getMeetups(): any {
    let params = {
      city     : 'chicago',
      category : this.CATEGORIES.TECH,
      page     : 10,
    }

    return this.get('open_events', params).map(res => res.json());
  }

}
