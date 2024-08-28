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
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import Background from "@/assets/hii.png";
import { apiClient } from "@/lib/api-client";
import { GET_ALL_CONTACTS_ROUTES, HOST, SEARCH_CONTACTS_ROUTES } from "@/utils/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAppStore } from "@/store";
import { Button } from "@/components/ui/button";
import MultipleSelector from "@/components/ui/multipleselect";


const CreateChannel = () => {
    const { setSelectedChatData, setSelectedChatType } = useAppStore();
    const [newChannelModel, setNewChannelModel] = useState(false);
    const [searchedContacts, setSearchedContacts] = useState([]);
    const [allContacts, setAllContacts] = useState([]);
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [channelName, setChannelName] = useState("");

    useEffect(() => {
        const getData = async () => {
            const response = await apiClient.get(GET_ALL_CONTACTS_ROUTES, { withCredentials: true });
            setAllContacts(response.data.contacts);
        };
        getData();
    },[])

    const createChannel = async () => {
        
    }

    return (
        <>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <FaPlus
                            className="text-natural-400 font-light text-opacity-90 text-start hover:text-natural-100 cursor-pointer transition-all duration-300"
                            onClick={() => setNewChannelModel(true)}
                        />
                    </TooltipTrigger>
                    <TooltipContent className="bg-[#1c1b1e] mb-2 p-3 text-white">
                        create New Group
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <Dialog open={newChannelModel} onOpenChange={setNewChannelModel}>
                <DialogContent className="bg-[#181920] border-none text-white w-[600px] h-[600px] flex flex-col ">
                    <DialogHeader>
                        <DialogTitle>Please fill up details!!</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <div>
                        <Input
                            placeholder="Group Name"
                            className="rounded-lg p-6 bg-[#2c2e3b] border-none"
                            onChange={(e) => setChannelName(e.target.value)}
                            value={channelName}
                        />
                    </div>
                    <div>
                        <MultipleSelector
                            className="rounded-lg bg-[#2c2e3b] border-none py-2 text-white"
                            defaultOptions={allContacts}
                            placeholder="Search Contacts"
                            value={selectedContacts}
                            onChange={setSelectedContacts}
                            emptyIndicator={
                                <p className="text-center text-lg leading-10 text-gray-600">No Result found :-( </p>
                            }
                        />
                    </div>
                    <div>
                        <Button className="w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300"
                        onClick={createChannel}
                        >Create Group</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default CreateChannel;