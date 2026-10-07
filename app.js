/* =====================================================
   RIC CORE
   DIGITAL BUSINESS MANAGEMENT SYSTEM
===================================================== */


/* =========================
   SAMPLE PRODUCT DATABASE
========================= */

const products = [

    {
        id: "RIC-001",
        name: "Power Drill",
        category: "Power Tools",
        stock: 12,
        reorder: 5,
        price: 1850
    },

    {
        id: "RIC-002",
        name: "Angle Grinder",
        category: "Power Tools",
        stock: 4,
        reorder: 5,
        price: 2350
    },

    {
        id: "RIC-003",
        name: "Claw Hammer",
        category: "Hand Tools",
        stock: 24,
        reorder: 8,
        price: 420
    },

    {
        id: "RIC-004",
        name: "Measuring Tape 5m",
        category: "Hand Tools",
        stock: 31,
        reorder: 10,
        price: 180
    },

    {
        id: "RIC-005",
        name: "PVC Pipe 1/2",
        category: "Construction",
        stock: 8,
        reorder: 10,
        price: 95
    },

    {
        id: "RIC-006",
        name: "Electrical Wire 2.0mm",
        category: "Electrical",
        stock: 16,
        reorder: 6,
        price: 680
    },

    {
        id: "RIC-007",
        name: "Safety Gloves",
        category: "Safety Gear",
        stock: 12,
        reorder: 8,
        price: 250
    },

    {
        id: "RIC-008",
        name: "Welding Rod",
        category: "Materials",
        stock: 15,
        reorder: 10,
        price: 310
    },

    {
        id: "RIC-009",
        name: "Nails",
        category: "Hardware",
        stock: 50,
        reorder: 15,
        price: 120
    }

];


/* =========================
   SYSTEM STATE
========================= */

let currentPage = "dashboard";

let inventorySearch = "";


/* =========================
   PAGE TITLES
========================= */

const pageTitles = {

    dashboard: "Dashboard",

    inventory: "Inventory",

    sales: "Sales",

    suppliers: "Suppliers",

    customers: "Customers",

    finance: "Finance",

    marketing: "Marketing",

    reports: "Reports",

    settings: "Settings"

};


/* =========================
   NAVIGATION
========================= */

document
    .querySelectorAll(".nav-item")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                currentPage =
                    button.dataset.page;

                closeMobileMenu();

                render();

            }
        );

    });


/* =========================
   MOBILE MENU
========================= */

document
    .getElementById("mobileMenu")
    .addEventListener(
        "click",
        () => {

            document
                .getElementById("sidebar")
                .classList
                .toggle("open");

        }
    );


function closeMobileMenu() {

    document
        .getElementById("sidebar")
        .classList
        .remove("open");

}


/* =========================
   MONEY FORMAT
========================= */

function money(value) {

    return "₱" +
        Number(value)
            .toLocaleString(
                "en-PH"
            );

}


/* =========================
   STAT CARD
========================= */

function statCard(
    icon,
    label,
    value,
    note,
    noteClass = ""
) {

    return `

        <div class="stat">

            <div class="stat-icon">
                ${icon}
            </div>

            <div class="stat-label">
                ${label}
            </div>

            <div class="stat-value">
                ${value}
            </div>

            <div class="stat-note ${noteClass}">
                ${note}
            </div>

        </div>

    `;

}


/* =========================
   STANDARD ROW
========================= */

function standardRow(
    title,
    subtitle,
    right
) {

    return `

        <div class="row">

            <div class="grow">

                <b>
                    ${title}
                </b>

                <small>
                    ${subtitle}
                </small>

            </div>

            ${right}

        </div>

    `;

}


/* =========================
   QUICK MODULE
========================= */

function quickModule(
    title,
    description
) {

    return `

        <div class="quick">

            <b>
                ${title}
            </b>

            <span>
                ${description}
            </span>

        </div>

    `;

}


/* =========================
   DASHBOARD
========================= */

function dashboardPage() {

    const lowStock =
        products.filter(
            product =>
                product.stock <=
                product.reorder
        );


    const totalUnits =
        products.reduce(
            (total, product) =>
                total + product.stock,
            0
        );


    return `

        <!-- WELCOME -->

        <div class="welcome">

            <div>

                <h2>
                    Good day, Owner.
                </h2>

                <p>
                    One connected system for RIC Industrial Trading.
                </p>

            </div>


            <button
                class="primary"
                data-page-go="inventory"
            >
                View Inventory
            </button>

        </div>



        <!-- STATISTICS -->

        <div class="stats">

            ${statCard(
                "▦",
                "Total Products",
                products.length,
                "Active product records"
            )}


            ${statCard(
                "□",
                "Stock Units",
                totalUnits,
                "Across all products"
            )}


            ${statCard(
                "₱",
                "Today's Sales",
                money(4365),
                "+12.4% vs previous day",
                "up"
            )}


            ${statCard(
                "!",
                "Low Stock",
                lowStock.length,
                "Needs attention",
                "warn"
            )}

        </div>



        <!-- TWO COLUMN SECTION -->

        <div class="grid">


            <!-- INVENTORY ALERTS -->

            <div class="card">

                <div class="card-head">

                    <div>

                        <h3>
                            Inventory Alerts
                        </h3>

                        <p>
                            Products at or below reorder level
                        </p>

                    </div>


                    <button
                        class="link-btn"
                        data-page-go="inventory"
                    >
                        View all
                    </button>

                </div>


                ${lowStock.map(
                    product =>

                    standardRow(

                        product.name,

                        product.category,

                        `
                            <span class="badge low">

                                ${product.stock}
                                remaining

                            </span>
                        `

                    )
                ).join("")}

            </div>



            <!-- RECENT TRANSACTIONS -->

            <div class="card">

                <div class="card-head">

                    <div>

                        <h3>
                            Recent Transactions
                        </h3>

                        <p>
                            Latest recorded sales
                        </p>

                    </div>


                    <button
                        class="link-btn"
                        data-page-go="sales"
                    >
                        View all
                    </button>

                </div>


                ${standardRow(
                    "Power Drill × 1",
                    "INV-1006 · Walk-in Customer",
                    `<b>${money(1850)}</b>`
                )}


                ${standardRow(
                    "Claw Hammer × 4",
                    "INV-1005 · J. Santos Construction",
                    `<b>${money(1680)}</b>`
                )}


                ${standardRow(
                    "PVC Pipe × 5",
                    "INV-1004 · Walk-in Customer",
                    `<b>${money(475)}</b>`
                )}

            </div>

        </div>



        <!-- RIC CORE MODULES -->

        <div class="card">

            <div class="card-head">

                <div>

                    <h3>
                        RIC Core — Built for Growth
                    </h3>

                    <p>
                        Information from connected functions can be brought into one management view.
                    </p>

                </div>

            </div>


            <div class="quick-grid">

                ${quickModule(
                    "Operations",
                    "Workflows & tasks"
                )}


                ${quickModule(
                    "Inventory",
                    "Products & stock"
                )}


                ${quickModule(
                    "Sales",
                    "Transactions"
                )}


                ${quickModule(
                    "Suppliers",
                    "Purchasing"
                )}


                ${quickModule(
                    "Customers",
                    "Relationships"
                )}


                ${quickModule(
                    "Finance",
                    "Income & expenses"
                )}


                ${quickModule(
                    "Marketing",
                    "Promotions"
                )}


                ${quickModule(
                    "Reports",
                    "Analytics"
                )}

            </div>

        </div>

    `;

}


/* =========================
   INVENTORY
========================= */

function inventoryPage() {

    const filteredProducts =
        products.filter(
            product => {

                const search =
                    inventorySearch
                        .toLowerCase();

                return (

                    product.name
                        .toLowerCase()
                        .includes(search)

                    ||

                    product.category
                        .toLowerCase()
                        .includes(search)

                    ||

                    product.id
                        .toLowerCase()
                        .includes(search)

                );

            }
        );


    return `

        <div class="card">

            <div class="card-head">

                <div>

                    <h3>
                        Inventory Management
                    </h3>

                    <p>
                        Monitor stock levels and reorder needs.
                    </p>

                </div>


                <button
                    class="primary"
                    data-toast="Add Product form opened"
                >
                    ＋ Add Product
                </button>

            </div>


            <!-- SEARCH -->

            <div class="search-box">

                ⌕

                <input
                    id="inventorySearch"
                    value="${inventorySearch}"
                    placeholder="Search products, category, or ID..."
                >

            </div>



            <!-- TABLE -->

            <div class="table-wrap">

                <table>

                    <thead>

                        <tr>

                            <th>
                                Product ID
                            </th>

                            <th>
                                Product
                            </th>

                            <th>
                                Category
                            </th>

                            <th>
                                Stock
                            </th>

                            <th>
                                Reorder
                            </th>

                            <th>
                                Unit Price
                            </th>

                            <th>
                                Status
                            </th>

                            <th>
                                Action
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        ${

                            filteredProducts
                                .map(
                                    product => `

                                    <tr>

                                        <td>
                                            ${product.id}
                                        </td>


                                        <td>
                                            <b>
                                                ${product.name}
                                            </b>
                                        </td>


                                        <td>
                                            ${product.category}
                                        </td>


                                        <td>
                                            <b>
                                                ${product.stock}
                                            </b>
                                        </td>


                                        <td>
                                            ${product.reorder}
                                        </td>


                                        <td>
                                            ${money(product.price)}
                                        </td>


                                        <td>

                                            <span
                                                class="badge ${
                                                    product.stock <=
                                                    product.reorder
                                                        ? "low"
                                                        : "ok"
                                                }"
                                            >

                                                ${
                                                    product.stock <=
                                                    product.reorder
                                                        ? "Low Stock"
                                                        : "In Stock"
                                                }

                                            </span>

                                        </td>


                                        <td>

                                            <button
                                                class="secondary"
                                                data-restock="${product.id}"
                                            >
                                                +5 Stock
                                            </button>

                                        </td>

                                    </tr>

                                `
                                )
                                .join("")

                        }

                    </tbody>

                </table>

            </div>

        </div>

    `;

}


/* =========================
   TABLE PAGE GENERATOR
========================= */

function tablePage(
    title,
    description,
    headers,
    rows,
    action
) {

    return `

        <div class="card">

            <div class="card-head">

                <div>

                    <h3>
                        ${title}
                    </h3>

                    <p>
                        ${description}
                    </p>

                </div>


                <button
                    class="primary"
                    data-toast="${action} opened"
                >
                    ＋ ${action}
                </button>

            </div>


            <div class="table-wrap">

                <table>

                    <thead>

                        <tr>

                            ${headers
                                .map(
                                    header =>
                                        `<th>${header}</th>`
                                )
                                .join("")
                            }

                        </tr>

                    </thead>


                    <tbody>

                        ${rows
                            .map(
                                row => `

                                    <tr>

                                        ${row
                                            .map(
                                                (
                                                    value,
                                                    index
                                                ) => `

                                                <td>

                                                    ${
                                                        index === 0

                                                            ?

                                                            `<b>${value}</b>`

                                                            :

                                                            value
                                                    }

                                                </td>

                                            `
                                            )
                                            .join("")
                                        }

                                    </tr>

                                `
                            )
                            .join("")
                        }

                    </tbody>

                </table>

            </div>

        </div>

    `;

}


/* =========================
   SALES
========================= */

function salesPage() {

    return tablePage(

        "Sales & Transactions",

        "Record transactions and connect them to inventory.",

        [
            "Reference",
            "Customer",
            "Item",
            "Qty.",
            "Total",
            "Status"
        ],

        [

            [
                "INV-1006",
                "Walk-in Customer",
                "Power Drill",
                "1",
                money(1850),
                `<span class="badge ok">
                    Completed
                </span>`
            ],


            [
                "INV-1005",
                "J. Santos Construction",
                "Claw Hammer",
                "4",
                money(1680),
                `<span class="badge ok">
                    Completed
                </span>`
            ],


            [
                "INV-1004",
                "Walk-in Customer",
                "PVC Pipe",
                "5",
                money(475),
                `<span class="badge ok">
                    Completed
                </span>`
            ],


            [
                "INV-1003",
                "M. Cruz",
                "Measuring Tape",
                "2",
                money(360),
                `<span class="badge ok">
                    Completed
                </span>`
            ]

        ],

        "New Sale"

    );

}


/* =========================
   SUPPLIERS
========================= */

function suppliersPage() {

    const suppliers = [

        [
            "ABC Hardware Supply",
            "Tools & hardware",
            "0917 123 4567"
        ],

        [
            "BuildRight Trading",
            "Materials & pipes",
            "0918 765 4321"
        ],

        [
            "ToolMaster PH",
            "Tools & power tools",
            "0920 111 2333"
        ],

        [
            "SafeWork Supplies",
            "Safety gear",
            "0917 888 7788"
        ]

    ];


    return `

        <div class="card">

            <div class="card-head">

                <div>

                    <h3>
                        Supplier Records
                    </h3>

                    <p>
                        Centralized information for purchasing and restocking.
                    </p>

                </div>


                <button
                    class="primary"
                    data-toast="Add Supplier form opened"
                >
                    ＋ Add Supplier
                </button>

            </div>


            <div class="supplier-grid">

                ${suppliers
                    .map(
                        supplier => `

                            <div class="supplier">

                                <div class="supplier-logo">

                                    ${supplier[0]
                                        .slice(0,2)
                                        .toUpperCase()
                                    }

                                </div>


                                <b>
                                    ${supplier[0]}
                                </b>


                                <p>
                                    ${supplier[1]}
                                </p>


                                <p>
                                    ${supplier[2]}
                                </p>


                                <span class="badge ok">
                                    Active
                                </span>

                            </div>

                        `
                    )
                    .join("")
                }

            </div>

        </div>

    `;

}


/* =========================
   CUSTOMERS
========================= */

function customersPage() {

    return tablePage(

        "Customer Records",

        "Organize customer information for service and future marketing.",

        [
            "Customer",
            "Type",
            "Contact",
            "Last Purchase",
            "Status"
        ],

        [

            [
                "J. Santos Construction",
                "Business",
                "0917 222 1010",
                "Claw Hammer",
                `<span class="badge ok">
                    Active
                </span>`
            ],


            [
                "M. Cruz",
                "Individual",
                "0918 555 2012",
                "Measuring Tape",
                `<span class="badge ok">
                    Active
                </span>`
            ],


            [
                "Walk-in Customer",
                "Retail",
                "—",
                "Power Drill",
                `<span class="badge ok">
                    Active
                </span>`
            ]

        ],

        "Add Customer"

    );

}


/* =========================
   FINANCE
========================= */

function financePage() {

    return `

        <div class="stats">


            ${statCard(
                "₱",
                "Total Income",
                money(48920),
                "+12% vs last month",
                "up"
            )}


            ${statCard(
                "−",
                "Total Expenses",
                money(32450),
                "Operating expenses"
            )}


            ${statCard(
                "₱",
                "Net Position",
                money(16470),
                "Sample management figure",
                "up"
            )}


            ${statCard(
                "!",
                "Pending Records",
                "3",
                "Needs review",
                "warn"
            )}

        </div>


        ${tablePage(

            "Finance Records",

            "Sample financial records for the scalable platform.",

            [
                "Date",
                "Description",
                "Type",
                "Amount",
                "Status"
            ],

            [

                [
                    "Apr 26",
                    "Sales income",
                    "Income",
                    money(2490),
                    `<span class="badge ok">
                        Recorded
                    </span>`
                ],


                [
                    "Apr 25",
                    "Purchase — ABC Hardware",
                    "Expense",
                    money(1000),
                    `<span class="badge ok">
                        Recorded
                    </span>`
                ],


                [
                    "Apr 23",
                    "Fuel & delivery",
                    "Expense",
                    money(2000),
                    `<span class="badge ok">
                        Recorded
                    </span>`
                ],


                [
                    "Apr 22",
                    "Sales income",
                    "Income",
                    money(3200),
                    `<span class="badge ok">
                        Recorded
                    </span>`
                ]

            ],

            "Add Record"

        )}

    `;

}


/* =========================
   MARKETING
========================= */

function marketingPage() {

    return `

        <div class="card">

            <div class="card-head">

                <div>

                    <h3>
                        Marketing
                    </h3>

                    <p>
                        Future module for product promotion, outreach, and customer engagement.
                    </p>

                </div>


                <button
                    class="primary"
                    data-toast="New Campaign form opened"
                >
                    ＋ New Campaign
                </button>

            </div>


            <div class="quick-grid">

                ${quickModule(
                    "Product Catalog",
                    "Share current products"
                )}


                ${quickModule(
                    "Customer Outreach",
                    "Organize inquiries"
                )}


                ${quickModule(
                    "Promotions",
                    "Manage offers"
                )}


                ${quickModule(
                    "Performance",
                    "Measure campaigns"
                )}

            </div>

        </div>

    `;

}


/* =========================
   REPORTS
========================= */

function reportsPage() {

    return `

        <div class="card">

            <div class="card-head">

                <div>

                    <h3>
                        Reports & Analytics
                    </h3>

                    <p>
                        Management information from connected business functions.
                    </p>

                </div>


                <button
                    class="primary"
                    data-toast="Report generated"
                >
                    Generate Report
                </button>

            </div>


            ${reportBar(
                "Inventory Accuracy",
                95
            )}


            ${reportBar(
                "Record Accessibility",
                88
            )}


            ${reportBar(
                "System Adoption",
                80
            )}


            ${reportBar(
                "Data Backup Coverage",
                90
            )}

        </div>

    `;

}


/* =========================
   REPORT BAR
========================= */

function reportBar(
    label,
    value
) {

    return `

        <div class="bar-row">

            <div class="bar-label">

                <span>
                    ${label}
                </span>

                <b>
                    ${value}%
                </b>

            </div>


            <div class="bar">

                <i
                    style="width:${value}%"
                ></i>

            </div>

        </div>

    `;

}


/* =========================
   SETTINGS
========================= */

function settingsPage() {

    return `

        <div class="card">

            <div class="card-head">

                <div>

                    <h3>
                        System Settings
                    </h3>

                    <p>
                        Prototype controls for users, access, and system preferences.
                    </p>

                </div>

            </div>


            <div class="quick-grid">

                ${quickModule(
                    "User Access",
                    "Owner & staff accounts"
                )}


                ${quickModule(
                    "Security",
                    "Passwords & permissions"
                )}


                ${quickModule(
                    "Backups",
                    "Data protection"
                )}


                ${quickModule(
                    "Preferences",
                    "Business settings"
                )}

            </div>

        </div>

    `;

}


/* =========================
   PAGE RENDER
========================= */

function render() {

    document
        .getElementById("pageTitle")
        .textContent =
        pageTitles[currentPage];


    document
        .querySelectorAll(".nav-item")
        .forEach(
            button => {

                button.classList.toggle(

                    "active",

                    button.dataset.page ===
                    currentPage

                );

            }
        );


    const content =
        document.getElementById(
            "content"
        );


    const pages = {

        dashboard:
            dashboardPage,

        inventory:
            inventoryPage,

        sales:
            salesPage,

        suppliers:
            suppliersPage,

        customers:
            customersPage,

        finance:
            financePage,

        marketing:
            marketingPage,

        reports:
            reportsPage,

        settings:
            settingsPage

    };


    content.innerHTML =
        pages[currentPage]();


    bindPageEvents();

}


/* =========================
   PAGE EVENTS
========================= */

function bindPageEvents() {


    /* INVENTORY SEARCH */

    const searchInput =
        document.getElementById(
            "inventorySearch"
        );


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            event => {

                inventorySearch =
                    event.target.value;

                render();


                setTimeout(
                    () => {

                        const input =
                            document.getElementById(
                                "inventorySearch"
                            );


                        if (input) {

                            input.focus();

                            input.setSelectionRange(

                                inventorySearch.length,

                                inventorySearch.length

                            );

                        }

                    },

                    0
                );

            }
        );

    }



    /* RESTOCK */

    document
        .querySelectorAll(
            "[data-restock]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const product =
                            products.find(
                                item =>
                                    item.id ===
                                    button.dataset.restock
                            );


                        if (!product) return;


                        product.stock += 5;


                        showToast(
                            `${product.name} stock updated`
                        );


                        render();

                    }
                );

            }
        );



    /* TOAST BUTTONS */

    document
        .querySelectorAll(
            "[data-toast]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        showToast(
                            button.dataset.toast
                        );

                    }
                );

            }
        );



    /* INTERNAL PAGE BUTTONS */

    document
        .querySelectorAll(
            "[data-page-go]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        currentPage =
                            button.dataset.pageGo;

                        render();

                    }
                );

            }
        );

}


/* =========================
   TOAST
========================= */

function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    setTimeout(
        () => {

            toast.classList.remove(
                "show"
            );

        },

        1800
    );

}


/* =========================
   INITIAL LOAD
========================= */

render();
