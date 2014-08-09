'use strict';

/* This is an example directive. Doesn't really do anything. However, this presents a good
opportunity to set a precedent for how we document our directives, like so:

<div sm-add-item ... ng-model='<array to add to>' ></div>
Adds an item to <array to add to> where this array is specified in the ng-model attribute of the
div smAddItem rests on. smAddItem must be attached to a div as it will not init its own elements.
*/
angular.module('remembrallApp')
  .directive('streakChart', ['d3Service', '$window', '_',
    function (d3Service, $window, _) {
      return {
        restrict: 'E',
        templateUrl: 'templates/chart.html',
        controller: 'VisualizationController',
        //Going to add this when we actually have a data model to pass to this.
        // For now we are going to monkeypatch our streak
        // require: '^streak'
        scope: {
          data: '='
        },
        link: function(scope, element, attrs) {
          var plotData = scope.data;
          var padding = 20;
          var pathClass = 'path';
          var xScale, yScale, xAxisGen, yAxisGen, lineFun, svg, rawSvg; 
          var width = 800,
              height = 350;
          var margin = { top: 20, right: 20, bottom: 20, left: 30};
          function setChartParameters(d3) {
            xScale = d3.time.scale()
                       .domain([plotData[0].dateTimeStamp,
                           plotData[plotData.length - 1].dateTimeStamp])
                       .range([5, width]);
            yScale = d3.scale.linear()
                       .domain([0, d3.max(plotData, function(d) {
                         return d.data;
                       })])
                       .range([height, 0]);
            xAxisGen = d3.svg.axis()
                             .scale(xScale)
                             .orient('bottom')
                             .ticks(d3.time.days, 1)
                             .tickFormat(d3.time.format('%a %d'))
                             .tickSize(0)
                             .tickPadding(8);
            yAxisGen = d3.svg.axis()
                             .scale(yScale)
                             .orient('left')
                             .ticks(5);

            lineFun = d3.svg.line()
                        .x(function(d) {
                          return xScale(d.dateTimeStamp);
                        })
                        .y(function(d) {
                          return yScale(d.data);
                        })
                        .interpolate('linear');
          }

          function drawLineChart(d3) {
            setChartParameters(d3);

            svg.append('svg:g')
               .attr('class', 'x axis')
               .attr('transform', 'translate(0, '+ height + ')')
               .call(xAxisGen);

            svg.append('svg:g')
               .attr('class', 'y axis')
               .attr('transform', 'translate(0, 0)')
               .call(yAxisGen);

            svg.append('svg:path')
               .attr({
                 d: lineFun(plotData),
                 'stroke': 'blue',
                 'stroke-width': 2,
                 'fill': 'none',
                 'class': pathClass
               });
          }
          d3Service.d3().then(function(d3) {
            rawSvg = element.find("svg")[0];
            svg = d3.select(rawSvg)
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
            .append("g")
              .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
            drawLineChart(d3);
          });

        }
      };
    }
  ]);
