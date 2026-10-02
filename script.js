// =====================================================
// 💗 CUTE HANGOUT PROJECT - SCRIPT.JS
// =====================================================

// ---------- SUPABASE CONFIGURATION ----------

// Your Supabase Project URL
const SUPABASE_URL =
    "https://btpcbrxniaqrbbnuyjhw.supabase.co";

// IMPORTANT:
// Paste your PUBLIC / PUBLISHABLE key here.
// It starts with: sb_publishable_
//
// NEVER put your sb_secret_ key in this file.
const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_N9oNasJO9Sm-6ziJ-I8RJg__hWtC3DV";


// ---------- CONNECT TO SUPABASE ----------

let db = null;

if (
    window.supabase &&
    SUPABASE_PUBLISHABLE_KEY.startsWith("sb_publishable_")
) {
    db = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );
}


// =====================================================
// VARIABLES
// =====================================================

let selectedDate = "";
let selectedPlace = "";
let selectedFood = "";


// =====================================================
// PAGE NAVIGATION
// =====================================================

function showPage(pageNumber) {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    const nextPage = document.getElementById(`page${pageNumber}`);

    if (nextPage) {
        nextPage.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// =====================================================
// PAGE 1
// "Wanna hang out?"
// =====================================================

const yes1 = document.getElementById("yesBtn");
const no1 = document.getElementById("noBtn");
const noMessage1 = document.getElementById("page1Message");


// YES BUTTON

if (yes1) {

    yes1.addEventListener("click", function () {

        showPage(2);

    });

}


// NO BUTTON
// Gets smaller every time she clicks it 😂

if (no1) {

    let noScale = 1;

    no1.addEventListener("click", function (event) {

        event.preventDefault();

        noScale -= 0.10;

        if (noScale < 0.45) {
            noScale = 0.45;
        }

        no1.style.transform = `scale(${noScale})`;

        if (noMessage1) {
            noMessage1.textContent =
                "The No button is getting shy... 🥺💕";
        }

    });

}


// =====================================================
// PAGE 2
// DATE
// =====================================================

const datePicker = document.getElementById("datePicker");
const selectedDateLabel = document.getElementById("selectedDate");
const dateNext = document.getElementById("dateNext");
const dateChoices = document.querySelectorAll(".date-choice");


// Prevent choosing a date in the past

if (datePicker) {

    const today = new Date();

    today.setMinutes(
        today.getMinutes() -
        today.getTimezoneOffset()
    );

    datePicker.min =
        today.toISOString().split("T")[0];


    function updateSelectedDate(dateValue) {

        selectedDate = dateValue;
        datePicker.value = dateValue;

        const date = new Date(dateValue + "T12:00:00");

        selectedDateLabel.textContent =
            date.toLocaleDateString(
                undefined,
                {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }
            ) + " 💕";

        dateNext.disabled = false;
    }


    // DATE SELECTED

    datePicker.addEventListener("change", function () {

        if (!datePicker.value) {
            selectedDate = "";
            selectedDateLabel.textContent = "Nothing yet 👀";
            dateNext.disabled = true;
            return;
        }

        updateSelectedDate(datePicker.value);

    });


    dateChoices.forEach(button => {

        button.addEventListener("click", function () {

            const targetDay = button.dataset.date === "Saturday" ? 6 : 0;
            const nextDate = new Date();
            nextDate.setHours(12, 0, 0, 0);

            const daysAhead = (targetDay - nextDate.getDay() + 7) % 7 || 7;
            nextDate.setDate(nextDate.getDate() + daysAhead);

            const dateValue =
                `${nextDate.getFullYear()}-${String(nextDate.getMonth() + 1).padStart(2, "0")}-${String(nextDate.getDate()).padStart(2, "0")}`;

            updateSelectedDate(dateValue);

        });

    });

}

// ---------- PAGE 2 YES ----------

const yes2 = document.getElementById("dateNext");

if (yes2) {

    yes2.addEventListener("click", function () {

        if (!selectedDate) {

            selectedDateLabel.textContent =
                "Pick a date first, silly 🥺💕";

            return;
        }

        showPage(3);

    });

}


// =====================================================
// PAGE 2 NO BUTTON
// Runs away from cursor
// BUT stays inside the page
// =====================================================

const no2 = document.getElementById("dateNoBtn");
const noMessage2 = document.getElementById("dateHint");

if (no2) {

    let attempts = 0;

    function escapeNoButton(event) {

        event.preventDefault();

        attempts++;


        // Random movement

        const moveX =
            Math.floor(Math.random() * 80) - 40;

        const moveY =
            Math.floor(Math.random() * 30) - 15;


        // Gets slightly smaller

        let scale =
            1 - (attempts * 0.07);


        if (scale < 0.60) {
            scale = 0.60;
        }


        no2.style.transform =
            `translate(${moveX}px, ${moveY}px) scale(${scale})`;


        if (noMessage2) {

            if (attempts >= 3) {

                noMessage2.textContent =
                    "You know the answer is YES 😂💕";

            } else {

                noMessage2.textContent =
                    "Try the other button 😌";

            }

        }

    }


    // Mouse comes near

    no2.addEventListener(
        "pointerenter",
        escapeNoButton
    );


    // Keyboard and click activation

    no2.addEventListener(
        "click",
        escapeNoButton
    );

}


// =====================================================
// PAGE 3
// PLACE SELECTION
// =====================================================

const placeButtons =
    document.querySelectorAll(
        ".place-card"
    );
const selectedPlaceLabel = document.getElementById("selectedPlace");
const placeNext = document.getElementById("placeNext");


placeButtons.forEach(button => {

    button.addEventListener("click", function () {

        // Remove previous selection

        placeButtons.forEach(btn => {
            btn.classList.remove("selected");
        });


        // Select this button

        button.classList.add("selected");


        // Save value

        selectedPlace =
            button.dataset.place;

        selectedPlaceLabel.textContent = selectedPlace;
        placeNext.disabled = false;

    });

});


// ---------- PAGE 3 YES ----------

const yes3 = placeNext;

if (yes3) {

    yes3.addEventListener("click", function () {

        if (!selectedPlace) {
            return;
        }


        showPage(4);

    });

}


// =====================================================
// PAGE 4
// FOOD SELECTION
// =====================================================

const foodButtons =
    document.querySelectorAll(
        ".food-card"
    );
const selectedFoodLabel = document.getElementById("selectedFood");
const foodNext = document.getElementById("foodNext");


foodButtons.forEach(button => {

    button.addEventListener("click", function () {

        foodButtons.forEach(btn => {
            btn.classList.remove("selected");
        });


        button.classList.add("selected");


        selectedFood =
            button.dataset.food;

        selectedFoodLabel.textContent = selectedFood;
        foodNext.disabled = false;

    });

});


// ---------- PAGE 4 YES ----------

const yes4 = foodNext;

if (yes4) {

    yes4.addEventListener("click", function () {

        if (!selectedFood) {
            return;
        }


        // Put information on final page

        const finalDate =
            document.getElementById("finalDate");

        const finalPlace =
            document.getElementById("finalPlace");

        const finalFood =
            document.getElementById("finalFood");


        const date =
            new Date(
                selectedDate + "T12:00:00"
            );


        finalDate.textContent =
            date.toLocaleDateString(
                undefined,
                {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }
            );


        finalPlace.textContent =
            selectedPlace;


        finalFood.textContent =
            selectedFood;


        // Go to final page

        showPage(5);

    });

}


// =====================================================
// PAGE 5
// SAVE EVERYTHING TO SUPABASE
// =====================================================

const confirmButton =
    document.getElementById("celebrateBtn");

const saveStatus =
    document.querySelector(".final-message p");


if (confirmButton) {

    confirmButton.addEventListener(
        "click",
        async function () {

            // Check Supabase connection

            if (!db) {

                saveStatus.textContent =
                    "Supabase isn't connected yet 💗";

                console.error(
                    "Supabase connection failed."
                );

                console.error(
                    "Check your publishable key in script.js"
                );

                return;
            }


            // Check selections

            if (
                !selectedDate ||
                !selectedPlace ||
                !selectedFood
            ) {

                saveStatus.textContent =
                    "Something is missing. Please go back and choose everything 💗";

                return;
            }


            // Disable button while saving

            confirmButton.disabled = true;

            confirmButton.textContent =
                "Saving our plan... 💗";


            saveStatus.textContent =
                "Just a tiny second... ✨";


            // =================================================
            // INSERT DATA INTO SUPABASE
            // =================================================

            const { data, error } =

                await db
                    .from("hangout_responses")
                    .insert([
                        {
                            selected_date:
                                selectedDate,

                            selected_place:
                                selectedPlace,

                            selected_food:
                                selectedFood
                        }
                    ]);


            // =================================================
            // ERROR
            // =================================================

            if (error) {

                console.error(
                    "SUPABASE ERROR:",
                    error
                );


                confirmButton.disabled =
                    false;


                confirmButton.textContent =
                    "Try Again 💌";


                saveStatus.textContent =
                    "It didn't save yet. Check Console 💗";


                return;
            }


            // =================================================
            // SUCCESS 🎉
            // =================================================

            console.log(
                "Hangout saved successfully!",
                data
            );


            confirmButton.textContent =
                "Confirmed! 🥰💗";


            saveStatus.textContent =
                "Our little plan is officially saved! ✨";


            confirmButton.style.transform =
                "scale(1.03)";

        }
    );

}


// =====================================================
// DEBUG MESSAGE
// =====================================================

console.log(
    "💗 Cute Hangout script.js loaded successfully!"
);


if (db) {

    console.log(
        "✅ Supabase client connected."
    );

} else {

    console.log(
        "⚠️ Supabase waiting for publishable key."
    );

}