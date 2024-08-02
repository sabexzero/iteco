export const getGlOffset = (nodes) => {
    const positions = [];
    let diff = []

    let local_min = 0;
    let local_max = 0;

    nodes.forEach((node) => {
        positions.push(node.position);
    })

    for (let i = positions.length - 1; i >= 0; i--) {
        if (positions[i].x > local_max) local_max = positions[i].x;
        if (positions[i].x < local_min) local_min = positions[i].x;
        if (positions[i].y === 0) {
            diff.push({min: local_min, center: positions[i].x, max: local_max});
            local_min = 0;
            local_max = 0;
        }
    }
    diff = diff.reverse();

    let index = -1;
    let r_prev_offset;
    let l_curr_offset;
    nodes.forEach((node) => {
        if (node.position.y === 0) {
            index++;
        }
        if (index > 0) {
            let r_prev_offset_local = 0;
            for (let i = index; i >= 1; i--) {
                if (!(diff[i - 1].max === diff[i - 1].center || diff[i - 1].min === diff[i - 1].center)) {
                    r_prev_offset_local += diff[i - 1].max - diff[i - 1].min;
                }
            }
            r_prev_offset = r_prev_offset_local
            if (diff[index].max === diff[index].center || diff[index].min === diff[index].center) {
                l_curr_offset = 0;
            } else {
                l_curr_offset = diff[index].center - diff[index].min;
            }
            node.position = {x: r_prev_offset + l_curr_offset + node.position.x, y: node.position.y}
        }
    })
}

function getXcoordinates(count, centerX, spacing) {
    let coordinates = [];
    let offset = (count - 1) / 2 * spacing;

    for (let i = 0; i < count; i++) {
        let x = centerX - offset + i * spacing;
        coordinates.push(x);
    }
    return coordinates;
}

export const buildHierarchy =
    (
        data, nodes = [],
        edges = [],
        parentId = null,
        level = 0,
        xCenter = 0
    ) =>
{
    const yBaseOffset = 100;
    const spacing = 180;
    let coordinates = getXcoordinates(data.length, xCenter, spacing);

    data.forEach((item, index) => {
        const nodeId = item.id.toString();
        const nodeX = coordinates[index];
        const nodeY = level * yBaseOffset;

        xCenter = coordinates[index];

        nodes.push({
            id: nodeId,
            type: 'custom',
            data: {name: item.name},
            position: {x: nodeX, y: nodeY},
        });

        if (parentId) {
            edges.push({
                id: `e${parentId}-${nodeId}`,
                source: parentId.toString(),
                target: nodeId,
                style: {stroke: '#007bff'},
            });
        }

        if (item.childs && item.childs.length > 0) {
            buildHierarchy(item.childs, nodes, edges, nodeId, level + 1, xCenter);
        }
    });

    return {nodes, edges};
};