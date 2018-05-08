require 'set'

# Skip to the end of the file, where the method is called
def solve jug_sizes, starting_state, has_drain, has_source
    if !block_given? 
        raise "Solve must be called with a block that checks a state (array of jug fill states) if it is a winning state."
    end

    if jug_sizes.length != starting_state.length 
        raise "The jug sizes array and starting state array must have the same length (i.e. for each jug there must be a size and fill state)"
    end

    seen_states=[starting_state].to_set
    states_to_process = [[[], starting_state]]

    while states_to_process.length > 0
        state_to_process = states_to_process.delete_at(0)
        puts "Processing state #{state_to_process[1]}..."
        if yield(state_to_process[1]) 
            puts "  problem solved."
            return state_to_process[0] 
        end

        state=state_to_process[1]
        steps=state_to_process[0]

        for from in 0..jug_sizes.length-1
            for to in 0..jug_sizes.length-1
                next if from==to
                next if state[from]==0
                next if state[to]==jug_sizes[to]

                new_state=state[0..-1]
                if state[from] + state[to] > jug_sizes[to]
                    new_state[to] = jug_sizes[to]
                    poured_amount = jug_sizes[to] - state[to]
                    new_state[from] = state[from] - poured_amount
                else
                    new_state[to] = state[from] + state[to]
                    new_state[from] = 0
                end

                puts "  after pouring from #{from} to #{to} reached #{new_state}."
                if !seen_states.include?(new_state)
                    seen_states.add(new_state)
                    new_steps = steps[0..-1]
                    new_steps << "#{from} -> #{to}"
                    states_to_process << [new_steps, new_state]
                end
            end
        end

        if has_drain 
            for target in 0..jug_sizes.length-1
                new_state=state[0..-1]
                new_state[target]=0                
                puts "  after draining from #{target} reached #{new_state}."
                if !seen_states.include?(new_state)
                    new_steps = steps[0..-1]
                    new_steps << "#{target} -> DRAIN"
                    states_to_process << [new_steps, new_state]
                end
            end
        end

        if has_drain 
            for target in 0..jug_sizes.length-1
                new_state=state[0..-1]
                new_state[target]=jug_sizes[target]
                puts "  after filling #{target} reached #{new_state}."
                if !seen_states.include?(new_state)
                    new_steps = steps[0..-1]
                    new_steps << "SOURCE -> #{target}"
                    states_to_process << [new_steps, new_state]
                end
            end
        end            
    end

    raise "No solution found."
end


# Change this call as follows:
# First parameter is an array containing the size of each jug
# Second parameter is an array containing the content of each jug (in the same order)
# Third parameter is a boolean indicating whether jugs can ben emptied into a drain
# Fourth parameter is a boolean indicating whether jugs can be filled from an endless water source
# A code block must be passed which checks whether a state (array containing the content of each jug) is a winning state
#
# The function performs a breadth-first-search on the game states.
puts "Steps taken: #{solve [10,5,6], [10,0,1], false, false { |state| state[0]==8 }}"
