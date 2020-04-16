export const isDev = true;

export const groupDetailMock = {
  name: "React Amsterdam",
  city: "Amsterdam",
  localized_country_name: "Netherlands",
  created: "",
  group_photo: {
    photo_link: "",
  },
  category: {
    name: "tech",
  },
  organizer: {
    name: "",
    photo: {
      thumb_link: "",
    },
  },
};

export const groupEventsMock = [
  {
    id: 1,
    name: "React remote meetup",
    time: "04-12-2020",
    group: {
      name: "React amsterdam",
      urlname: "test",
    },
    venue: {
      name: "Your home",
      address_1: "",
    },
  },
];

export const groupMembersMock = {
  results: [
    {
      name: "John",
      photo: {
        thumb_link:
          "https://lh3.googleusercontent.com/proxy/OH4fGFajz9ZMwiKzI9IHz-MTmIAxkRAqE5wrREeJun4r3TM2tifbmGjBy_K3fEtpr2J6ITs3HxDxKLOKYQDdJhIvMAE2P_J57NUzvolSfJWbiFOcqJw8No67dwcLPQ",
      },
    },
    {
      name: "Paul van Haam",
      photo: {
        thumb_link:
          "https://webstockreview.net/images/male-clipart-masculine-16.png",
      },
    },
  ],
};

export const memberMock = {
  name: "Bart Muller",
  city: "Amsterdam",
  country: "NL",
  bio: "Cool guy, Organizer of React Amsterdam meetups",
  joined: "12-01-2016",
  social: [
    {
      provider: "twitter",
      profile: "@bmuller",
    },
    {
      provider: "facebook",
      profile: "bart.muller",
    },
  ],
  photo: {
    photo_link:
      "https://media.istockphoto.com/vectors/profile-icon-male-head-in-chat-bubble-isolated-young-man-avatar-vector-id912380678?k=6&m=912380678&s=612x612&w=0&h=yNNxSeTv_VhrS_8aeKVucmSynStC-BwiHjB3YPRCLQk=",
  },
  topics: [
    {
      name: "react",
    },
    {
      name: "javascript",
    },
    {
      name: "open source",
    },
  ],
};

export const hostsMock = [
  {
    name: "Bart Muller",
    bio: "Organizer of React Amsterdam meetups",
    photo: {
      thumb_link:
        "https://media.istockphoto.com/vectors/profile-icon-male-head-in-chat-bubble-isolated-young-man-avatar-vector-id912380678?k=6&m=912380678&s=612x612&w=0&h=yNNxSeTv_VhrS_8aeKVucmSynStC-BwiHjB3YPRCLQk=",
    },
    group_profile: {
      role: "Organizer",
    },
  },
];

export const commentsMock = [
  {
    created: "12-12-2020",
    comment: "Nice! I will be there for sure!",
    member: {
      name: "John",
      photo: {
        thumb_link:
          "https://lh3.googleusercontent.com/proxy/OH4fGFajz9ZMwiKzI9IHz-MTmIAxkRAqE5wrREeJun4r3TM2tifbmGjBy_K3fEtpr2J6ITs3HxDxKLOKYQDdJhIvMAE2P_J57NUzvolSfJWbiFOcqJw8No67dwcLPQ",
      },
    },
  },
];

export const meetupMock = {
  meta: {
    total_count: 3,
  },
  results: [
    {
      id: 1,
      name: "React remote meetup",
      time: "04-12-2020",
      group: {
        name: "React amsterdam",
        urlname: "test",
      },
      venue: {
        name: "Your home",
        address_1: "",
      },
    },
    {
      id: 2,
      name: "Everything javascript",
      time: "04-23-2020",
      group: {
        name: "React amsterdam",
        urlname: "test",
      },
      venue: {
        name: "The H Room",
        address_1: "Hemholtstraat 13",
      },
    },
    {
      id: 3,
      name: "Java User Group meetup",
      time: "08-21-2020",
      group: {
        name: "Java amsterdam",
        urlname: "test",
      },
      venue: {
        name: "Your home",
        address_1: "Really, your home",
      },
    },
  ],
};

export const groupsMock = [
  {
    name: "React Amsterdam",
    group_photo: {
      photo_link:
        "https://secure.meetupstatic.com/photos/event/3/b/2/7/600_454335143.jpeg",
      thumb_link:
        "https://secure.meetupstatic.com/photos/event/3/b/2/7/600_454335143.jpeg",
    },
    city: "Amsterdam",
    localized_country_name: "Netherlands",
    created: "02-02-2018",
    members: 28,
    category: {
      name: "tech",
    },
    organizer: {
      name: "Bart Muller",
      photo: {
        thumb_link:
          "https://media.istockphoto.com/vectors/profile-icon-male-head-in-chat-bubble-isolated-young-man-avatar-vector-id912380678?k=6&m=912380678&s=612x612&w=0&h=yNNxSeTv_VhrS_8aeKVucmSynStC-BwiHjB3YPRCLQk=",
      },
    },
  },
  {
    name: "Java User Group Amsterdam",
    group_photo: {
      thumb_link:
        "https://secure.meetupstatic.com/photos/event/7/d/1/5/highres_477032021.jpeg",
    },
    city: "Amsterdam",
    localized_country_name: "Netherlands",
    members: 28,
  },
];
