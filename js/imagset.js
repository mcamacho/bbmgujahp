//js with json list of image parameters
// fadeTime sets the fading time for the slide image animation
// iteration sets the iteration time between each image
// pathfolder is the the slide images folder
// link -> path could be either a url or the vimeo video number
// link -> optCaption & optLink are only for videos
 
var imageset = {
    'fadeTime':1000,
    'iteration':10000,
    'pathFolder':'home-assets/',
    'images': [
        {
            'imgfile': 'delivering_dignity-bg.jpg',
            'title': 'Delivering Dignity',
            'line1': 'Holocaust survivors living in New York are among the poorest of low-income',
            'line2': 'Jews in the city. Together, you+UJA help them live their lives with dignity.',
            'link': {
               'path': 'http://www.bbmg.com'
                }
            },
        {
            'imgfile': 'head_start_in_israel-bg.jpg',
            'title': 'A Head Start in Israel',
            'line1': 'We\'re leveling the playing field so first generation Ethiopian Israelis can achieve',
            'line2': 'the same successes as other Israelis. Another reason Israel+UJA are good together.',
            'link': {
               'path': 'http://www.ujafedny.org'
                }
            },
        {
            'imgfile': 'we_remember-bg.jpg',
            'title': 'We Remember',
            'line1': 'We could only respond on 9/11 because we were ready on 9/10.',
            'line2': 'Ten years ago, UJA + our agencies sprung into action to help all New Yorkers.',
            'link': {
                'source': 'vimeo',
                'path': '9594822',
                'optCaption': 'Area for a video caption. Sit amet, consectetur adipiscing eif',
                'optLink': 'http://www.ujafedny.org'
                }
            },
        {
            'imgfile': 'good_wholesome_fun-bg.jpg',
            'title': 'Good, Wholesome Fun',
            'line1': 'Programs like Eden Village connect kids to their Jewish roots while promoting a',
            'line2': 'sustainable world. Discover how you+UJA can help deepen a child\'s Jewish identity.',
            'link': {
               'source': 'youtube',
               'path': 'ObwsyiIuOkg',
               'optCaption': 'Area for a video caption. Sit amet, consectetur adipiscing eif',
               'optLink': 'http://www.ujafedny.org'
                }
            },
        {
            'imgfile': 'work_it-bg.jpg',
            'title': 'Work It',
            'line1': 'Thanks to our network of agencies, we\'re ensuring community members of all ages',
            'line2': 'enjoy a healthy lifestyle. No wonder UJA+JCC are good together.',
            'link': {
               'path': 'http://www.ujafedny.org/our-mission/'
                }
            }
    ]
};
