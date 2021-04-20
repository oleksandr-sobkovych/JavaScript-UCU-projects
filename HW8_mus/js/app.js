'use strict';

const ENTRY_POINT = 'https://collectionapi.metmuseum.org/public/collection/v1';
const DEPARTMENTS = 'departments';
const OBJECTS = 'objects';
const DATA_UNKNOWN = 'Unknown';
const NO_DISPLAY = 'No images to fetch';

async function getObjects(departmentId) {
    const mainSection = document.getElementById('items-list');
    mainSection.innerHTML = '';
    let objectIDs = (await fetch(`${ENTRY_POINT}/${OBJECTS}?departmentIds=${departmentId}`)
        .then(response => response.json())).objectIDs;
    let displayed = 0;
    let imageSrc;
    let i = 0;
    while (displayed < 10 && i < objectIDs.length) {
        await Promise.all(objectIDs.slice(i, i+10).map(id => fetch(`${ENTRY_POINT}/${OBJECTS}/${id}`)
            .then(response => response.json())))
            .then(values => {
                for (const objectData of values) {
                    if (displayed >= 10) {
                        break;
                    }
                    imageSrc = objectData.primaryImage ? objectData.primaryImage
                        : (objectData.primaryImageSmall ? objectData.primaryImageSmall
                            : (objectData.additionalImages ? objectData.additionalImages[0] : null));
                    if (!imageSrc) {
                        continue;
                    }
                    const li = document.createElement("li");
                    const title = document.createElement("h1");
                    const timeDescription = document.createElement("h2");
                    const image = document.createElement("img");
                    title.appendChild(document.createTextNode(objectData.title
                        ? objectData.title : DATA_UNKNOWN));
                    timeDescription.appendChild(document.createTextNode(objectData.objectDate
                        ? objectData.objectDate : DATA_UNKNOWN));
                    image.src = imageSrc;
                    li.append(image, title, timeDescription);
                    mainSection.appendChild(li);
                    displayed++;
                }
            });
        i += 10;
    }
    if (displayed === 0) {
        mainSection.appendChild(document.createTextNode(NO_DISPLAY));
    }
}

async function createDepartments() {
    let departments;
    try {
       departments = await fetch(`${ENTRY_POINT}/${DEPARTMENTS}`)
           .then(response => response.json());
    } catch(e) {
        departments = {departments: [{departmentId: "", displayName: "..."}]};
    }
    const dropdown = document.getElementById('dropdown-list');
    for (const department of departments.departments) {
        const li = document.createElement("li");
        li.onclick = () => {
            getObjects(department.departmentId);
        }
        li.appendChild(document.createTextNode(department.displayName));
        dropdown.appendChild(li);
    }
}

function showDepartments() {
    document.getElementById('dropdown-list').classList.toggle("show");
}

window.onclick = (event) => {
    if (!event.target.matches('.drop-btn')) {
        document.getElementById('dropdown-list').classList.remove("show");
    }
}
