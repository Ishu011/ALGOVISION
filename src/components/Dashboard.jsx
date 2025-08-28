import React, { memo } from 'react';
import {
  Database,
  Link,
  Layers,
  ArrowRight,
  BarChart3,
  Search,
  GitBranch,
  Network,
  Zap
} from 'lucide-react';

const topics = [
  {
    id: 'array',
    title: 'Arrays',
    description: 'Explore arrays with operations like insertion, deletion, searching, and traversal.',
    icon: Database,
    features: [
      'Random access to elements',
      'Insert and delete operations',
      'Linear and binary search',
      'Memory visualization'
    ]
  },
  {
    id: 'linkedlist',
    title: 'Linked Lists',
    description: 'Understand singly and doubly linked lists with dynamic memory allocation and pointers.',
    icon: Link,
    features: [
      'Dynamic size management',
      'Node insertion and deletion',
      'Traversal animations',
      'Pointer visualization'
    ]
  },
  {
    id: 'stack',
    title: 'Stacks',
    description: 'Learn LIFO principle with push, pop, and peek operations.',
    icon: Layers,
    features: [
      'LIFO visualization',
      'Push and pop animations',
      'Stack overflow detection',
      'Real-world applications'
    ]
  },
  {
    id: 'queue',
    title: 'Queues',
    description: 'Understand FIFO principle with enqueue and dequeue operations.',
    icon: ArrowRight,
    features: [
      'FIFO visualization',
      'Enqueue & dequeue animations',
      'Circular queue implementation',
      'Front and rear pointers'
    ]
  },
  {
    id: 'trees',
    title: 'Trees',
    description: 'Explore hierarchical structures including BST, AVL trees, and traversals.',
    icon: GitBranch,
    features: [
      'Binary tree operations',
      'Tree traversal algorithms',
      'Binary search tree (BST)',
      'Height & balance visualization'
    ]
  },
  {
    id: 'graphs',
    title: 'Graphs',
    description: 'Learn graph representations, traversals (BFS, DFS), and shortest paths.',
    icon: Network,
    features: [
      'Graph representations',
      'BFS & DFS traversals',
      'Shortest path algorithms',
      'Connected components'
    ]
  },
  {
    id: 'sorting',
    title: 'Sorting Algorithms',
    description: 'Visualize sorting algorithms like bubble, merge, and quick sort.',
    icon: BarChart3,
    features: [
      'Multiple sorting algorithms',
      'Step-by-step animations',
      'Performance comparison',
      'Time complexity analysis'
    ]
  },
  {
    id: 'searching',
    title: 'Searching Algorithms',
    description: 'Learn linear search, binary search with visual demonstrations.',
    icon: Search,
    features: [
      'Linear & binary search',
      'Search animations',
      'Performance analysis',
      'Best & worst cases'
    ]
  },
  {
    id: 'dp',
    title: 'Dynamic Programming',
    description: 'Master DP concepts with problems like Fibonacci, Knapsack, and LCS.',
    icon: Zap,
    features: [
      'Memoization techniques',
      'Bottom-up approach',
      'Classic DP problems',
      'Optimization visualization'
    ]
  }
];

const Dashboard = memo(({ onNavigate }) => {
  return (
    <div className="dashboard p-6">
      <header className="dashboard-header text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">DSA Visualization</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Master Data Structures & Algorithms through interactive visualizations.
          Explore working approaches, properties, operations, applications, advantages, and disadvantages
          of fundamental computer science concepts.
        </p>
      </header>

      <section className="topics-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map(({ id, title, description, icon: Icon, features }) => (
          <div
            key={id}
            role="button"
            tabIndex={0}
            className="topic-card p-5 rounded-2xl shadow-lg bg-white hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 hover:border-indigo-500"
            onClick={() => onNavigate(id)}
            onKeyDown={(e) => e.key === 'Enter' && onNavigate(id)}
          >
            <div className="flex items-center gap-3 mb-4">
              <Icon className="topic-icon w-8 h-8 text-indigo-600" />
              <h3 className="text-xl font-semibold">{title}</h3>
            </div>
            <p className="text-gray-600 mb-3">{description}</p>
            <ul className="text-sm text-gray-500 list-disc list-inside space-y-1">
              {features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
});

export default Dashboard;
