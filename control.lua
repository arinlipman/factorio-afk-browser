local json = require("json") -- For easy data formatting

-- control.lua

local function export_logistics_data()
    local forces = game.forces[1]
    if not forces then
        return
    end

    local network_data = {} -- Table to store data for all networks

    for surface_name, networks in pairs(forces.logistic_networks) do
        if networks and #networks > 0 then
            for _, network in pairs(networks) do
                local network_info = {}
                network_info.id = network.network_id
                network_info.surface = surface_name
                network_info.item_counts = {} -- Table to store item counts for this network

                -- Get item counts in the network
                local network_contents = network.get_contents()
                for _, item in ipairs(network_contents) do
                    local item_name = item.name
                    local count = item.count
                    local quality = item.quality
                    network_info.item_counts[item_name] = network_info.item_counts[item_name] or {}
                    network_info.item_counts[item_name][quality] = count
                end

                table.insert(network_data, network_info) -- Add network info to the main data table
            end
        end
    end

    -- Get current technology being researched
    local current_research = forces.current_research
    local research_info = {
        name = current_research and current_research.name or "None",
        progress = current_research and forces.research_progress or 0
    }

    -- Combine all data
    local export_data = {
        logistics_networks = network_data,
        current_research = research_info
    }

    -- Convert the data to JSON format
    local output_string = helpers.table_to_json(export_data)

    -- File Writing
    local file_path = "logistics_networks.json" 
    helpers.write_file(file_path, output_string, false)
end

-- Register a command to trigger the export function every 5 minutes (18000 ticks)
script.on_nth_tick(3600, function()
    export_logistics_data()
end)

