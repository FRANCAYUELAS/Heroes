  export interface BigResponse {
    code: number
    data: Data
    status: string
  }
  
  export interface Data {
    offset: number
    limit: number
    total: number
    count: number
    results: Result[]
  }
  
  export interface Result {
    id: number
    name: string
    description: string
    modified: string
    thumbnail: Thumbnail
    resourceURI: string
    comics: Comics
    series: Series
    stories: Stories
    events: Events
    urls: Url[]
  }
  
  export interface Thumbnail {
    path: string
    extension: string
  }
  
  export interface Comics {
    available: number
    collectionURI: string
    items: Item[]
    returned: number
  }
  
  export interface Item {
    resourceURI: string
    name: string
  }
  
  export interface Series {
    available: number
    collectionURI: string
    items: Item[]
    returned: number
  }
  
  export interface Stories {
    available: number
    collectionURI: string
    items: Item[]
    returned: number
  }

  export interface Events {
    available: number
    collectionURI: string
    items: Item[]
    returned: number
  }
  
  export interface Url {
    type: string
    url: string
  }
  