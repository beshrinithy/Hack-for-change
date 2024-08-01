import Head from "next/head";
import styles from "../styles/Home.module.css";
import New from "./new";
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
import { useState, useEffect } from "react";

export default function Home() {
  const [Map, setMap] = useState();
  const [pageIsMounted, setPageIsMounted] = useState(false);

  mapboxgl.accessToken =
    "pk.eyJ1IjoiYWF5aXNoYW5vb3JhIiwiYSI6ImNsdG9rZmtldjBmbnkyaXJxcTBmc3p3bDcifQ.ysCteCLg_AmddGTiOhIAaA";

  /**
   * Assign a unique id to each store. You'll use this id
   * later to associate each point on the map with a listing
   * in the sidebar.
   */
  stores.features.forEach((store, i) => {
    store.properties.id = i;
  });

  useEffect(() => {
    setPageIsMounted(true);
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/light-v10",
      center: [80.2707, 13.0827], // Chennai coordinates
      zoom: 11, // Adjust the zoom level as needed
    });

    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl(), "top-right");
    setMap(map);
  }, []);

  useEffect(() => {
    if (pageIsMounted && stores) {
      Map.on("load", () => {
        Map.addSource("places", {
          type: "geojson",
          data: stores,
        });
        buildLocationList(stores);
        addMarkers();
      });
    }
  });

  /**
   * Add a marker to the map for every store listing.
   **/
  function addMarkers() {
    /* For each feature in the GeoJSON object above: */
    for (const feature of stores.features) {
      /* Create a div element for the marker. */
      const el = document.createElement("div");
      /* Assign a unique id to the marker. */
      el.id = marker-${feature.properties.id};
      /* Assign the marker class to each marker for styling. */
      el.className = "marker";

      // Determine marker URL based on fill level
      let markerURL = "";
      el.style.backgroundSize = "contain";
      el.style.width = "20px"; // Adjust the width as needed
      el.style.height = "25px";
      if (feature.properties.fill_level < "50%") {
        markerURL =
          "https://ik.imagekit.io/690kne5m6/Dustbin/green.png?updatedAt=1710261892393";
      } else if (feature.properties.fill_level < "90%") {
        markerURL =
          "https://ik.imagekit.io/690kne5m6/Dustbin/orange.png?updatedAt=1710261892385";
      } else {
        markerURL =
          "https://ik.imagekit.io/690kne5m6/Dustbin/red.png?updatedAt=1710261892478";
      }

      /**
       * Create a marker using the div element
       * defined above and add it to the map.
       **/
      new mapboxgl.Marker(el, { offset: [0, -23] })
        .setLngLat(feature.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup().setHTML(
            <h3>${feature.properties.address}</h3><p>Fill Level: ${feature.properties.fill_level}%</p>
          )
        )
        .addTo(Map);

      // Set marker background image
      el.style.backgroundImage = url(${markerURL});

      /**
       * Listen to the element and when it is clicked, do three things:
       * 1. Fly to the point
       * 2. Close all other popups and display popup for clicked store
       * 3. Highlight listing in sidebar (and remove highlight for all other listings)
       **/
      el.addEventListener("click", (e) => {
        /* Fly to the point */
        flyToStore(feature);
        /* Close all other popups and display popup for clicked store */
        createPopUp(feature);
        /* Highlight listing in sidebar */
        const activeItem = document.getElementsByClassName("active");
        e.stopPropagation();
        if (activeItem[0]) {
          activeItem[0].classList.remove("active");
        }
        const listing = document.getElementById(
          listing-${feature.properties.id}
        );
        listing.classList.add("active");
      });
    }
  }

  /**
   * Add a listing for each store to the sidebar.
   **/
  function buildLocationList(stores) {
    for (const store of stores.features) {
      /* Add a new listing section to the sidebar. */
      const listings = document.getElementById("listings");
      const listing = listings.appendChild(document.createElement("div"));
      /* Assign a unique id to the listing. */
      listing.id = listing-${store.properties.id};
      /* Assign the item class to each listing for styling. */
      listing.className = "item";

      /* Add the link to the individual listing created above. */
      const link = listing.appendChild(document.createElement("a"));
      link.href = "#";
      link.className = "title";
      link.id = link-${store.properties.id};
      link.innerHTML = ${store.properties.address};

      /* Add details to the individual listing. */
      const details = listing.appendChild(document.createElement("div"));
      details.innerHTML = ${store.properties.city};
      if (store.properties.phone) {
        details.innerHTML += ` &middot; ${store.properties.phoneFormatted}`;
      }

      /**
       * Listen to the element and when it is clicked, do four things:
       * 1. Update the currentFeature to the store associated with the clicked link
       * 2. Fly to the point
       * 3. Close all other popups and display popup for clicked store
       * 4. Highlight listing in sidebar (and remove highlight for all other listings)
       **/
      link.addEventListener("click", function () {
        for (const feature of stores.features) {
          if (this.id === link-${feature.properties.id}) {
            flyToStore(feature);
            createPopUp(feature);
          }
        }
        const activeItem = document.getElementsByClassName("active");
        if (activeItem[0]) {
          activeItem[0].classList.remove("active");
        }
        this.parentNode.classList.add("active");
      });
    }
  }

  /**
   * Use Mapbox GL JS's flyTo to move the camera smoothly
   * a given center point.
   **/
  function flyToStore(currentFeature) {
    Map.flyTo({
      center: currentFeature.geometry.coordinates,
      zoom: 15,
    });
  }

  /**
   * Create a Mapbox GL JS Popup.
   **/
  function createPopUp(currentFeature) {
    const popUps = document.getElementsByClassName("mapboxgl-popup");
    if (popUps[0]) popUps[0].remove();
    const popup = new mapboxgl.Popup({ closeOnClick: false })
      .setLngLat(currentFeature.geometry.coordinates)
      .setHTML(
        <h3>Dust Bin</h3><h4>${currentFeature.properties.address}</h4><h4>${currentFeature.properties.fill_level}</h4>
      )
      .addTo(Map);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Planners Smart Dustbin</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://api.tiles.mapbox.com/mapbox-gl-js/v2.9.1/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <main className={styles.main}>
        <div className="sidebar">
          <div className="heading">
            <h1>Our locations</h1>
          </div>
          <div id="listings" className="listings"></div>
        </div>
        <div id="map" className="map"></div>
      </main>
      <script src="https://api.tiles.mapbox.com/mapbox-gl-js/v2.9.1/mapbox-gl.js"></script>
    </div>
  );
}