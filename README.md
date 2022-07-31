<div id="top"></div>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">Fullstack Comic website</h3>

  <p align="center">
    A Comic Website using Django and Nextjs framework!
    <br />
    <a href="https://github.com/onggiabayluon/fullstack-comic-app"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/onggiabayluon/fullstack-comic-app">View Demo</a>
    ·
    <a href="https://github.com/onggiabayluon/fullstack-comic-app/issues">Report Bug</a>
    ·
    <a href="https://github.com/onggiabayluon/fullstack-comic-app/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

🐧🐧 Temporarily don't know what to write

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

- Python >=3.9

### Technologies

- Back-end Rest Apis using Django-rest-framework
- Front-end using Nextjs framework

### Functionality

- [ ] Login, logout, signup using google, facebook
- [x] Comic Views
- [x] Comment, reply
- [x] Bookmark
- [ ] Local reading history
- [x] Rate
- [ ] Payment using MoMo
- [ ] Update User Profile
- [ ] Chapter Free timer (Free after a specific interval time, Ex: 1 week)
- [ ] Chapter Coin (Require coin for reading a chapter) 

### Installation Back-end using Scripts

1. Clone the repo

   ```sh
   git clone https://github.com/onggiabayluon/fullstack-comic-app.git
   ```

2. Setting your Mysql root name and password in settings.py file for Mysql:
   [./comicsapis/comicsapis/settings.py](https://github.com/onggiabayluon/fullstack-comic-app/blob/ca9d6917eef7f7d5375eabcc13ffd0d3be859c22/django-apis/comicapis/comicapis/settings.py#L99)

3. First time setup, Run init.sh Scripts in Git bash, This Script Will:

- Create and activate venv
- Install requirements.txt packages
- Migrate database
- Create super user
- Run the project

```sh
./init.sh
```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

> For back-end apis:

1. Running project using runs.sh:

   ```sh
    ./run.sh
   ```

2. Manage data using admin page: /admin

   - admin
   - 123456

#
![image](https://user-images.githubusercontent.com/70091587/182029328-b1d6696d-c51e-410f-86dd-135b550e5b98.png)
#

3. View apis list: /swagger

#
![image](https://user-images.githubusercontent.com/70091587/182029124-48527506-7655-4e2f-b32e-40c67433e5b3.png)
#

> For front-end:

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/onggiabayluon/Ecourseapis.svg?style=for-the-badge
[contributors-url]: https://github.com/onggiabayluon/fullstack-comic-app/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/onggiabayluon/Ecourseapis.svg?style=for-the-badge
[forks-url]: https://github.com/onggiabayluon/fullstack-comic-app/network/members
[stars-shield]: https://img.shields.io/github/stars/onggiabayluon/Ecourseapis.svg?style=for-the-badge
[stars-url]: https://github.com/onggiabayluon/fullstack-comic-app/stargazers
[issues-shield]: https://img.shields.io/github/issues/onggiabayluon/Ecourseapis.svg?style=for-the-badge
[issues-url]: https://github.com/onggiabayluon/fullstack-comic-app/issues
[license-shield]: https://img.shields.io/github/license/onggiabayluon/Ecourseapis.svg?style=for-the-badge
[license-url]: https://github.com/onggiabayluon/fullstack-comic-app/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/onggiabayluon
[product-screenshot]: images/screenshot.png
