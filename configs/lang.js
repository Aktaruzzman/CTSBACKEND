const lang = {
    /**SUBJECT*/
    id: { en: "Id", bn: "আইডি" },
    name: { en: "Name", bn: "নাম" },
    phone: { en: "Phone", bn: "ফোন" },
    phone_number: { en: "Phone Number", bn: "ফোন নম্বর" },
    email: { en: "Email", bn: "ইমেইল" },
    email_address: { en: "Email address", bn: "ইমেইল এড্রেস" },
    username: { en: "Username", bn: "ইউজারনেম" },
    user: { en: "User", bn: "ব্যবহারকারী" },
    admin_username_length: { en: "Username must be at least 8 characters", bn: "ব্যবহারকারীর নাম কমপক্ষে ৮ টি অক্ষরের হতে হবে।" },
    admin_password_length: { en: "Password must be at least 8 characters", bn: "পাসওয়ার্ড কমপক্ষে ৮ টি অক্ষরের হতে হবে।" },
    password: { en: "Password", bn: "পাসওয়ার্ড" },
    group: { en: "Group", bn: "গ্রুপ" },
    product: { en: "Product", bn: "পণ্য" },
    employee: { en: "Employee", bn: "কর্মচারী" },
    customer: { en: "Customer", bn: "কাস্টমার" },
    supplier: { en: "Supplier", bn: "সাপ্লায়ার" },
    driver: { en: "Driver", bn: "ড্রাইভার" },
    trader: { en: "Trader", bn: "ব্যবসায়ী" },
    brand: { en: "Brand", bn: "ব্র্যান্ড" },
    report: { en: "Report", bn: "রিপোর্ট" },
    status: { en: "Status", bn: "স্ট্যাটাস" },
    active: { en: "Active", bn: "সক্রিয়" },
    inactive: { en: "Inactive", bn: "নিষ্ক্রিয়" },
    add: { en: "Add", bn: "যুক্ত করুন" },
    add_new: { en: "Add New", bn: "নতুন যুক্ত করুন" },
    edit: { en: "Edit", bn: "এডিট" },
    update: { en: "Update", bn: "আপডেট" },
    limit: { en: "Limit", bn: "লিমিট" },
    offset: { en: "Offset", bn: "অফসেট" },
    login: { en: "Login", bn: "লগইন" },
    logout: { en: "Logout", bn: "লগআউট" },
    owner: { en: "Owner", bn: "মালিক" },
    district: { en: "District", bn: "জেলা" },
    upazilla: { en: "Upazilla", bn: "উপজেলা" },
    union: { en: "Union", bn: "ইউনিয়ন" },
    /**PREDICATE*/
    invalid_proxy: { en: "% is invalid", bn: "% বৈধ নয়।" },
    save_proxy: { en: "Save %", bn: "% সংরক্ষণ করুন" },
    update_proxy: { en: "Update %", bn: "% হালনাগাদ করুন" },
    view_proxy: { en: "View %", bn: "% দেখুন" },
    open_proxy: { en: "Open %", bn: "% খুলুন" },
    close_proxy: { en: "Close %", bn: "% বন্ধ করুন" },
    change_proxy: { en: "Change %", bn: "% পরিবর্তন করুন" },
    convert_proxy: { en: "Convert %", bn: "% রূপান্তরিত করুন" },
    delete_proxy: { en: "Delete %", bn: "% মুছে দিন" },
    send_proxy: { en: "Send %", bn: "% পাঠান" },
    from_proxy: { en: "From %", bn: "% থেকে" },
    to_proxy: { en: "To %", bn: "%-এ" },
    /**MESSAGE*/
    proxy_is_required: { en: "% is required.", bn: "% আবশ্যক।" },
    proxy_is_invalid: { en: "% is invalid.", bn: "% বৈধ নয়" },
    proxy_information_invalid: { en: "% information is not valid.", bn: "% তথ্য বৈধ নয়।" },
    proxy_saved_successfully: { en: "% saved successfully.", bn: "% সফলভাবে সংরক্ষিত হয়েছে।" },
    proxy_saving_failed: { en: "% saving failed.", bn: "% সংরক্ষণ ব্যর্থ হয়েছে।" },
    proxy_sent_successfully: { en: "% has been sent successfully.", bn: "% সফলভাবে প্রেরণ করা হয়েছে।" },
    proxy_sending_failed: { en: "% sending failed.", bn: "% প্রেরণ ব্যর্থ হয়েছে।" },
    proxy_updated_successfully: { en: "% updated successfully.", bn: "% সফলভাবে আপডেট হয়েছে।" },
    proxy_updating_failed: { en: "% updating failed.", bn: "% আপডেট ব্যর্থ হয়েছে।" },
    proxy_deleted_successfully: { en: "% deleted successfully.", bn: "% সফলভাবে মুছে ফেলা হয়েছে।" },
    proxy_deleting_failed: { en: "% deletion failed.", bn: "% মুছে ফেলা ব্যর্থ হয়েছে।" },
    proxy_service_inactive: { en: "% service is inactive. please activate this before using.", bn: "% সার্ভিস নিষ্ক্রিয়। দয়া করে ব্যবহার করার আগে এটি সক্রিয় করুন।" },
    no_proxy_yet_added: { en: "No % yet added", bn: "এখনও কোন % যুক্ত করা হয়নি" },
    proxy_already_in_use: { en: "% already in use.", bn: "% ইতিমধ্যে ব্যবহৃত।" },
    invalid_date_range: { en: "Invalid date range, inital date seems larger.", bn: "অবৈধ তারিখের সীমা, প্রাথমিক তারিখটি বড় মনে হচ্ছে।" },
    invalid_time_range: { en: "Invalid date range, inital date seems larger.", bn: "অবৈধ সময় পরিসীমা, প্রাথমিক সময় বৃহত্তর বলে মনে হয়।" },
    unauthorized_access: { en: "Unauthorized Access", bn: "অননুমোদিত প্রবেশ" },
    access_forbidden: { en: "Access Forbidden", bn: "প্রবেশ নিষিদ্ধ" },
    password_suggession_msg: { en: "Password must be  of minimum 8 charactrers length. And it must contain a uppercase letter, a lowercase, a number and special character.", bn: "পাসওয়ার্ড অবশ্যই ন্যূনতম 8 অক্ষরের দৈর্ঘ্যের হতে হবে। এবং এটিতে একটি বড় হাতের অক্ষর, একটি ছোট হাতের অক্ষর, একটি সংখ্যা এবং একটি বিশেষ অক্ষর থাকতে হবে।" },
};
module.exports.lang = lang;

function langof(value, locale = 'en', proxy = null) {
    let result = null
    if (typeof(value) === "object") {
        if (locale && value[locale]) result = value[locale];
        else result = 'Sometext';
    } else {
        if (locale && lang[value] && lang[value][locale]) result = lang[value][locale];
        else result = value;
    }
    if (proxy) {
        if (typeof(proxy) === "object") result = result.replace("%", proxy[locale]);
        else if (lang[proxy]) result = result.replace("%", lang[proxy][locale]);
        else result = result.replace("%", proxy);
    }
    return result;
}
module.exports.langof = langof;