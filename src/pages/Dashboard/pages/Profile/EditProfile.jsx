import React, { useState } from 'react';
import { ArrowLeft, Upload, ChevronDown } from 'lucide-react';

function EditPrifile() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        profession: '',
        dateOfBirth: {
            date: '',
            month: '',
            year: ''
        },
        phone: '',
        location: '',
        personalEmail: '',
        aboutYourself: '',
        professionalBackground: ''
    });

    const [profileImage, setProfileImage] = useState(null);
    const [companyLogo, setCompanyLogo] = useState(null);

    const handleInputChange = (field, value) => {
        if (field.includes('.')) {
            const [parent, child] = field.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [field]: value
            }));
        }
    };

    const handleProfileImageChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            setProfileImage(file);
        }
    };

    const handleCompanyLogoChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            setCompanyLogo(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', { formData, profileImage, companyLogo });
    };

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const dates = Array.from({ length: 31 }, (_, i) => i + 1);

    return (
        <div className="min-h-screen">
            <div className="relative z-10 container mx-auto md:px-6 md:py-8 max-w-7xl">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6 sm:mb-8">
                    <button
                        className="flex items-center gap-2 text-white hover:text-blue-300 transition-colors duration-200 hover:cursor-pointer"
                        onClick={() => window.history.back()}
                    >
                        <ArrowLeft size={20} />
                        <span className="text-sm font-medium">Back</span>
                    </button>
                </div>

                <div className="max-w-4xl mt-10 mx-auto overflow-y-auto">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 text-auth-button-bg" >
                        Edit Profile Details
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Basic Information */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: '#ACC0D8' }}>First Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter here"
                                    value={formData.firstName}
                                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: '#ACC0D8' }}>Last Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter here"
                                    value={formData.lastName}
                                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: '#ACC0D8' }}>Gender</label>
                                <input
                                    type="text"
                                    placeholder="Enter here"
                                    value={formData.gender}
                                    onChange={(e) => handleInputChange('gender', e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: '#ACC0D8' }}>Profession</label>
                                <input
                                    type="text"
                                    placeholder="Enter here"
                                    value={formData.profession}
                                    onChange={(e) => handleInputChange('profession', e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Date of Birth and Profile Picture */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: '#ACC0D8' }}>Date of Birth</label>
                                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                                    <div className="relative">
                                        <select
                                            value={formData.dateOfBirth.date}
                                            onChange={(e) => handleInputChange('dateOfBirth.date', e.target.value)}
                                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
                                        >
                                            <option value="" className="bg-slate-800">Date</option>
                                            {dates.map(date => (
                                                <option key={date} value={date} className="bg-slate-800">{date}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                                    </div>

                                    <div className="relative">
                                        <select
                                            value={formData.dateOfBirth.month}
                                            onChange={(e) => handleInputChange('dateOfBirth.month', e.target.value)}
                                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
                                        >
                                            <option value="" className="bg-slate-800">Month</option>
                                            {months.map((month, index) => (
                                                <option key={month} value={index + 1} className="bg-slate-800">{month}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                                    </div>

                                    <div className="relative">
                                        <input
                                            type="number"
                                            placeholder="Year"
                                            value={formData.dateOfBirth.year}
                                            onChange={(e) => {
                                                const value = e.target.value.replace(/\D/g, '');
                                                if (value.length <= 4) {
                                                    handleInputChange('dateOfBirth.year', value);
                                                }
                                            }}
                                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: '#ACC0D8' }}>Upload profile picture</label>
                                <div className="relative">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleProfileImageChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        id="profile-upload"
                                    />
                                    <label
                                        htmlFor="profile-upload"
                                        className="flex items-center justify-between w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white cursor-pointer hover:bg-white/10 transition-all duration-200"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Upload size={16} style={{ color: '#ACC0D8' }} />
                                            <span className="text-sm">Choose file</span>
                                        </div>
                                        <span className="text-sm text-gray-400 line-clamp-1">
                                            {profileImage ? profileImage.name : 'No file is selected'}
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: '#ACC0D8' }}>Phone</label>
                                <input
                                    type="tel"
                                    placeholder="Enter here"
                                    value={formData.phone}
                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: '#ACC0D8' }}>Personal Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter here"
                                    value={formData.personalEmail}
                                    onChange={(e) => handleInputChange('personalEmail', e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Company Logo and Additional Fields */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: '#ACC0D8' }}>Upload Company logo</label>
                                <div className="relative">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleCompanyLogoChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        id="company-logo-upload"
                                    />
                                    <label
                                        htmlFor="company-logo-upload"
                                        className="flex items-center justify-between w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white cursor-pointer hover:bg-white/10 transition-all duration-200"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Upload size={16} style={{ color: '#ACC0D8' }} />
                                            <span className="text-sm">Choose file</span>
                                        </div>
                                        <span className="text-sm text-gray-400 line-clamp-1">
                                            {companyLogo ? companyLogo.name : 'No file is selected'}
                                        </span>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: '#ACC0D8' }}>Location</label>
                                <input
                                    type="text"
                                    placeholder="Enter here"
                                    value={formData.location}
                                    onChange={(e) => handleInputChange('location', e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Text Areas */}
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: '#ACC0D8' }}>About yourself</label>
                                <textarea
                                    placeholder="Enter here"
                                    value={formData.aboutYourself}
                                    onChange={(e) => handleInputChange('aboutYourself', e.target.value)}
                                    rows={6}
                                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: '#ACC0D8' }}>Professional Background</label>
                                <textarea
                                    placeholder="Enter here"
                                    value={formData.professionalBackground}
                                    onChange={(e) => handleInputChange('professionalBackground', e.target.value)}
                                    rows={6}
                                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center pt-6 sm:pt-8">
                            <button
                                type="submit"
                                className="w-full sm:w-auto bg-auth-button-bg hover:cursor-pointer px-8 sm:px-12 py-3 rounded-lg font-medium text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                            >
                                Done
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditPrifile;