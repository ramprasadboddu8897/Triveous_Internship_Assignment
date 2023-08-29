import cron from "node-cron";
import productModel from "../models/product.js";
import fs from 'fs'


let isCronRunning = false; // Flag to track if the cron job is running

function checkIfAllProductsApproved() {
    // Replace 'Product' with your actual Mongoose model name
    return productModel.find({ approved: false }).countDocuments().exec()
      .then(count => count === 0);
  }  

// Function to process unapproved products
const processUnapprovedProducts = async () => {
  if (isCronRunning) return; // Return if the cron job is already running
  isCronRunning = true;

  try {
    const unapprovedProducts = await productModel.find({ approved: false });

    if (unapprovedProducts.length > 0) {
      for (const product of unapprovedProducts) {
        // Process the product (e.g., set approved to true)
        product.approved = true;
        await product.save();
      }
    }

    console.log("Cron job ran successfully.");
  } catch (error) {
    console.error("Cron job error:", error);
  }

  isCronRunning = false;
};
  
  
  export const upload =async (req, res) => {
    processUnapprovedProducts(); // Start processing unapproved products
    res.send("Uploaded and Triggerd Cron Job.");
  };
  
  // Flag to track if all products are approved
    let allProductsApproved = false;

  // Schedule the cron job to run every minute
    const cronjob = cron.schedule("*/3 * * * *", () => {
        if (allProductsApproved) {
            console.log("All products are approved. Stopping cron job.");
            cronJob.stop(); // Stop the cron job
            return; // Exit the function
        }
    
        processUnapprovedProducts(); // Continuously process unapproved products

        // Logic to check if all products are approved
        // Replace this with your actual logic to determine if all products are approved
        const areAllProductsApproved = checkIfAllProductsApproved();

        if (areAllProductsApproved) {
            allProductsApproved = true;
        }

        const logsFilePath="./logs.txt";
  
        let data = `${new Date().toUTCString()} 
                : Cron job is Processing\n`;

        // Create the directory if it doesn't exist
        if (!fs.existsSync(logsFilePath)) {
            console.log("logs.txt does not exist. Creating...");
            fs.writeFileSync(logsFilePath, ""); // Create an empty file
        }
  
        // Appending data to logs.txt file
        fs.appendFile(logsFilePath, data, function (err) {
        if (err) {
            console.error("Error appending to logs.txt:", err);
        } else {
            console.log("Status Logged!");
        }
        });
    });
  
