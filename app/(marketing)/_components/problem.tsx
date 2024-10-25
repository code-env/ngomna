import React from 'react';

const Problem = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              The Problem
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Government agencies often operate in silos, leading to inefficient
              data sharing, inconsistent information, and delayed
              decision-making processes. The lack of interoperability between
              agencies hinders the delivery of seamless public services and
              informed policy-making.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
