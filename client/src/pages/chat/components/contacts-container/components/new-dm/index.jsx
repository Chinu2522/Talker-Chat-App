import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { getColor } from '@/lib/utils';
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import Background from "@/assets/hii.png";
import { apiClient } from "@/lib/api-client";
import { HOST, SEARCH_CONTACTS_ROUTES } from "@/utils/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAppStore } from "@/store";


const NewDM = () => {
    const { setSelectedChatData, setSelectedChatType } = useAppStore();
    const [openNewContactModel, setOpenNewContactModel] = useState(false);
    const [searchedContacts, setSearchedContacts] = useState([]);

    const searchContacts = async (searchTerm) => {
        console.log('Search term:', searchTerm);
        try {
            if (searchTerm.length > 0) {
                const response = await apiClient.post(SEARCH_CONTACTS_ROUTES, { searchTerm }, { withCredentials: true });
                if (response.status === 200 && response.data.contacts) {
                    setSearchedContacts(response.data.contacts);
                }
            } else {
                setSearchedContacts([]);
            }
        } catch (error) {
            console.log({ error });
        }
    };

    const selectNewContact = (contact) => {
        setOpenNewContactModel(false);
        setSelectedChatType("contact");
        setSelectedChatData(contact);
        setSearchedContacts([]);
    }

    return (
        <>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <FaPlus
                            className="text-natural-400 font-light text-opacity-90 text-start hover:text-natural-100 cursor-pointer transition-all duration-300"
                            onClick={() => setOpenNewContactModel(true)}
                        />
                    </TooltipTrigger>
                    <TooltipContent className="bg-[#1c1b1e] mb-2 p-3 text-white">
                        Select New Contact
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <Dialog open={openNewContactModel} onOpenChange={setOpenNewContactModel}>
                <DialogContent className="bg-[#181920] border-none text-white w-[600px] h-[600px] flex flex-col ">
                    <DialogHeader>
                        <DialogTitle>Please select a contact!!</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <div>
                        <Input
                            placeholder="Search Contacts"
                            className="rounded-lg p-6 bg-[#2c2e3b] border-none"
                            onChange={(e) => searchContacts(e.target.value)}
                        />
                    </div>
                    {searchContacts.length > 0 && (
                        <ScrollArea className="h-[250px]">
                        <div className="flex flex-col gap-5">
                            {searchedContacts.map((contact) => (
                                <div key={contact._id} className="flex gap-3 items-center cursor-pointer"
                                    onClick={() => selectNewContact(contact)}>
                                    <div className="w-12 h-12 relative">
                                        <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                                            {contact.image ? (
                                                <AvatarImage src={`${HOST}/${contact.image}`}
                                                    alt="profile"
                                                    className="object-cover w-full h-full bg-black"
                                                />
                                            ) : (<div className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] flex items-center justify-center rounded-full ${getColor(contact.color.toString())}}`}>
                                                {contact.firstName
                                                    ? contact.firstName.split("").shift()
                                                    : contact.email.split("").shift()
                                                }
                                            </div>)}
                                        </Avatar>
                                    </div>
                                    <div className="flex flex-col">
                                        <span>
                                            {contact.firstName && contact.lastName
                                                ? `${contact.firstName} ${contact.lastName}` : contact.email}
                                        </span>
                                        <span className="text-xs">{contact.email}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>)}
                    
                    {searchedContacts.length <= 0 && (
                        <div className="text-opacity-80 text-white flex flex-col items-center lg:text-2xl text-xl transition-all duration-300 text-center">
                            <h3 className="pacifico-regular">
                                HII!! <span className="text-purple-500">Let's chat :)</span>
                            </h3>
                            <div className="image-container">
                                <img
                                    src={Background}
                                    alt="hiii"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default NewDM;