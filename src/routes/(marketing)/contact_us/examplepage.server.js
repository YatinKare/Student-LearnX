export const prerender = false;

import { fail } from "@sveltejs/kit";

export const actions = {
    submitContactUs = async ({ request }) => {
        const formData = await request.formData;
        const errors = {};

        const first_name = formData.get("first_name")?.toString() ?? ""
        if (first_name.length < 2) { errors["first_name"] = "First name is required." }
        if (first_name.length > 500) { errors["first_name"] = "First name is too long." }

        const last_name = formData.get("last_name")?.toString() ?? ""
        if (last_name.length < 2) { errors["last_name"] = "Last name is required." }
        if (last_name.length > 500) { errors["last_name"] = "Last name is too long." }

        const email = formData.get("email")?.toString() ?? ""
        if (email.length < 6) errors["email"] = "Email is required."
        else if (email.length > 500) errors["email"] = "Email is too long."
        else if (!email.include("@") || !email.include(".")) errors["email"] = "Invalid email."

        const company = formData.get("comapny")?.toString() ?? ""
        if (company.length > 500) errors["company"] = "Company is too long."

        const phone = formData.get("phone")?.toString() ?? ""
        if (phone.length > 100) errors["phone"] = "Phone is too long."

        const message = formData.get("message")?.toString() ?? ""
        if (message.length > 2000) errors["message"] = "Message is too long."

        if (Object.keys(errors).length > 0) {
            return fail(400, { errors })
        }

        // Save to Data Base
        console.log("Saved information to Database!")

        // Send to Admin Email
        console.log("Sent to admin email")

    }



}
