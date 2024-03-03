List<Group> groups = new List<Group>();
List<String> names1 = new List<String> {
    'Illustrious',
    'Illuminous',
    'Magnanimous',
    'Majestic',
    'Paradoxical',
    'Stupendous',
    'Spectacular',
    'Sensational',
    'Promotional',
    'Emotional',
    'Inspirational',
    'Motivational',
    'Educational',
    'Innovative',
    'Ingenious',
    'Incredible',
    'Unbelievable',
    'Unforgettable',
    'Unstoppable',
    'Unbreakable',
    'Unshakeable',
    'Unmistakable'
};

List<String> names2 = new List<String> {
    'Panda',
    'Bears',
    'Penguin',
    'Lion',
    'Tiger',
    'Elephant',
    'Giraffe',
    'Kangaroo',
    'Koala',
    'Pariah',
    'Puma',
    'Panther',
    'Polar Bear',
    'Puffin',
    'Penguin',
    'Pigeon',
    'Pheasant',
    'Piranha'
};
for(Integer i = 0; i < 200; i++) {
    Group g = new Group();
    g.Name = names1[Math.mod( (Integer) Math.floor(Math.random() * 200), names1.size())] + ' ' + names2[Math.mod( (Integer) Math.floor(Math.random() * 200), names2.size())];
    g.DeveloperName = g.Name.replaceAll(' ', '_');
    g.Type = 'Regular';
    groups.add(g);
}
Database.insert(groups, false);