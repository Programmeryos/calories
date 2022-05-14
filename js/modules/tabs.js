function tabs(tab, tabsList, tabsContent, activeClass) {
    //Tabs

    const tabs = document.querySelectorAll(tab),
        tabList = document.querySelector(tabsList),
        tabContent = document.querySelectorAll(tabsContent);

    function hideTabContent () {
        tabContent.forEach(e => {
            e.classList.remove('show');
            e.classList.add('hide');
        });

        tabs.forEach(e => {
            e.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) {
        tabs[i].classList.add(activeClass);

        tabContent[i].classList.remove('hide');
        tabContent[i].classList.add('show');

    }

    hideTabContent();
    showTabContent();

    tabList.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains(tab.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

export default tabs;