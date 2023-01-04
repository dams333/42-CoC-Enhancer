// ==UserScript==
// @name         CoC 42 enhancer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Find your peer
// @author       dhubleur
// @match        https://www.codingame.com/clashofcode/*
// @match        https://www.codingame.com/ide/*
// @icon         https://www.google.com/s2/favicons?domain=42.fr
// @downloadURL  https://raw.githubusercontent.com/dams333/42-CoC-Enhancer/main/script.js
// @updateURL    https://raw.githubusercontent.com/dams333/42-CoC-Enhancer/main/script.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const db = {
        "dhubleur": {
            "login": "dhubleur",
            "coalition": {
                "name": "Order",
                "color": "#FF6950",
                "url": "https://cdn.intra.42.fr/coalition/image/47/order.svg"
            }
        },
        "BSoD": {
            "login": "dhubleur",
            "coalition": {
                "name": "Order",
                "color": "#FF6950",
                "url": "https://cdn.intra.42.fr/coalition/image/47/order.svg"
            }
        }
    };

    function detect_clash_lobby()
    {
        const main = document.getElementById("clashofcode-lobby");
        if (main != null)
        {
            const users = main.getElementsByClassName("player-info");
            for (const user of users)
            {
                const pseudo = user.getElementsByClassName("truncate-pseudo");
                if (pseudo.length > 0 && !pseudo[0].classList.contains("42-modified"))
                {
                    const elem = pseudo[0];
                    elem.classList.add("42-modified");
                    if (db[elem.getAttribute('title')] != null)
                    {
                        elem.innerHTML = db[elem.getAttribute('title')].login;
                        const coa = document.createElement('div');
                        coa.style.display ='inline';
                        coa.style.fontWeight = 500;
                        coa.style.color = db[elem.getAttribute('title')].coalition.color;
                        coa.innerHTML = db[elem.getAttribute('title')].coalition.name;
                        const image = document.createElement('img');
                        image.setAttribute('src', db[elem.getAttribute('title')].coalition.url);
                        image.setAttribute('width', '15px');
                        image.setAttribute('width', '15px');
                        image.style.marginLeft = '3px';
                        image.setAttribute("fill", db[elem.getAttribute('title')].coalition.color)
                        coa.appendChild(image);
                        elem.parentNode.insertBefore(coa, elem.nextSibling);
                    }
                }
            }
        }
    }

    function detect_clash()
    {
        let main = document.getElementsByClassName("ide");
        if (main.length > 0)
        {
            main = main[0];
            const users = main.getElementsByClassName("leaderboard-item");
            for (const user of users)
            {
                if (user.classList.contains("type_clasher"))
                {
                    const pseudo = user.getElementsByClassName("nickname");
                    if (pseudo.length > 0 && !pseudo[0].classList.contains("42-modified"))
                    {
                        const elem = pseudo[0];
                        elem.classList.add("42-modified");
                        if (db[elem.innerHTML] != null)
                        {
                            const user = db[elem.innerHTML];
                            elem.innerHTML = user.login + "<br/>(" + user.coalition.name + ")";
                            elem.style.color = user.coalition.color;
                        }
                    }
                }
            }
        }
    }

    function detect_clash_result()
    {
        const main = document.getElementById("clashofcode-report");
        if (main != null)
        {
            const users = main.getElementsByClassName("player-report");
            for (const user of users)
            {
                const pseudo = user.getElementsByClassName("nickname");
                if (pseudo.length > 0 && !pseudo[0].classList.contains("42-modified"))
                {
                    const elem = pseudo[0];
                    elem.classList.add("42-modified");
                    if (db[elem.innerHTML] != null)
                    {
                        const user = db[elem.innerHTML];
                        elem.innerHTML = user.login + " ";
                        const coa = document.createElement('div');
                        coa.style.display ='inline';
                        coa.style.fontWeight = 500;
                        coa.style.color = user.coalition.color;
                        coa.innerHTML = user.coalition.name;
                        const image = document.createElement('img');
                        image.setAttribute('src', user.coalition.url);
                        image.setAttribute('width', '15px');
                        image.setAttribute('width', '15px');
                        image.style.marginLeft = '3px';
                        image.setAttribute("fill", user.coalition.color)
                        coa.appendChild(image);
                        elem.parentNode.insertBefore(coa, elem.nextSibling);
                    }
                }
            }
        }
    }

    function detection()
    {
        detect_clash_lobby();
        detect_clash();
        detect_clash_result();
        setTimeout(detection, 200);
    }

    detection();
    // Your code here...
})();
